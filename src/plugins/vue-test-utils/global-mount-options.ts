import {
  CodemodPlugin, Kinds, namedTypes, scriptBuilders,
} from 'vue-metamorph';
import { findMounts, isTestFile } from './utils';

const getGlobalObject = (node: namedTypes.ObjectExpression) => {
  for (const prop of node.properties) {
    if (prop.type === 'Property'
      && prop.key.type === 'Identifier'
      && prop.key.name === 'global'
      && prop.value.type === 'ObjectExpression') {
      return prop.value;
    }
  }

  const value = scriptBuilders.objectExpression([]);

  return value;
};

export const globalMountOptionsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'global-mount-options',
  transform(scriptASTs, _sfcAST, filename, { traverseScriptAST }) {
    if (!isTestFile(filename)) {
      return 0;
    }

    let count = 0;

    for (const scriptAST of scriptASTs) {
      const globalMixins: Kinds.ExpressionKind[] = [];
      const globalComponents: [
        key: namedTypes.Literal | namedTypes.Identifier,
        value: Kinds.ExpressionKind,
      ][] = [];
      const globalDirectives: [
        key: namedTypes.Literal | namedTypes.Identifier,
        value: Kinds.ExpressionKind,
      ][] = [];

      traverseScriptAST(scriptAST, {
        visitImportDeclaration(path) {
          if (path.node.source.value === '@vue/test-utils') {
            path.node.specifiers = path.node.specifiers?.filter((specifier) => specifier.type !== 'ImportSpecifier'
                || specifier.local?.name !== 'createLocalVue');
          }
          this.traverse(path);
        },

        visitVariableDeclaration(path) {
          path.node.declarations = path.node.declarations.filter((node) => node.type !== 'VariableDeclarator'
              || node.id.type !== 'Identifier'
              || node.id.name !== 'localVue');

          if (path.node.declarations.length === 0) {
            path.replace();
            return false;
          }

          return this.traverse(path);
        },

        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'localVue') {
            switch (path.node.callee.property.name) {
              case 'mixin': {
                if (path.node.arguments[0] && path.node.arguments[0].type !== 'SpreadElement') {
                  globalMixins.push(path.node.arguments[0]);
                }
                break;
              }
              case 'component': {
                if ((path.node.arguments[0]?.type === 'Identifier'
                  || path.node.arguments[0]?.type === 'Literal')
                  && path.node.arguments[1]
                  && path.node.arguments[1].type !== 'SpreadElement') {
                  globalComponents.push([path.node.arguments[0], path.node.arguments[1]]);
                }
                break;
              }
              case 'directive': {
                if ((path.node.arguments[0]?.type === 'Identifier'
                  || path.node.arguments[0]?.type === 'Literal')
                  && path.node.arguments[1]
                  && path.node.arguments[1].type !== 'SpreadElement') {
                  globalDirectives.push([path.node.arguments[0], path.node.arguments[1]]);
                }
                break;
              }

              default: break;
            }

            path.replace();
            return false;
          }
          return this.traverse(path);
        },
      });

      const mounts = findMounts(scriptAST);

      for (const mount of mounts) {
        mount.properties = mount.properties.filter((prop) => prop.type !== 'Property' || prop.key.type !== 'Identifier' || prop.key.name !== 'localVue');

        const plugins: (namedTypes.Identifier | namedTypes.CallExpression)[] = [];
        let mocks: namedTypes.Property | null = null;
        let stubs: namedTypes.Property | null = null;

        mount.properties = mount.properties.filter((prop) => {
          if (prop.type !== 'Property') {
            return true;
          }

          if (prop.key.type === 'Identifier'
            && (prop.value.type === 'Identifier' || prop.value.type === 'CallExpression')
            && ['store', 'router', 'i18n'].includes(prop.key.name)) {
            plugins.push(prop.value);
            return false;
          }

          if (prop.key.type === 'Identifier'
            && prop.key.name === 'mocks') {
            mocks = prop;
            return false;
          }

          if (prop.key.type === 'Identifier'
            && prop.key.name === 'stubs') {
            stubs = prop;
            return false;
          }

          return true;
        });

        let transformed = false;

        const globalObject = getGlobalObject(mount);

        if (globalMixins.length > 0) {
          globalObject.properties.push(
            scriptBuilders.property(
              'init',
              scriptBuilders.identifier('mixins'),
              scriptBuilders.arrayExpression(globalMixins),
            ),
          );
          transformed = true;
        }

        if (globalDirectives.length > 0) {
          globalObject.properties.push(
            scriptBuilders.property(
              'init',
              scriptBuilders.identifier('directives'),
              scriptBuilders.objectExpression(
                globalDirectives.map(([name, value]) => scriptBuilders.property('init', name, value)),
              ),
            ),
          );
          transformed = true;
        }

        if (globalComponents.length > 0) {
          globalObject.properties.push(
            scriptBuilders.property(
              'init',
              scriptBuilders.identifier('components'),
              scriptBuilders.objectExpression(
                globalComponents.map(([name, value]) => scriptBuilders.property('init', name, value)),
              ),
            ),
          );
          transformed = true;
        }

        if (plugins.length > 0) {
          globalObject.properties.push(
            scriptBuilders.property(
              'init',
              scriptBuilders.identifier('plugins'),
              scriptBuilders.arrayExpression(
                plugins,
              ),
            ),
          );
          transformed = true;
        }

        if (mocks) {
          globalObject.properties.push(mocks);
          transformed = true;
        }

        if (stubs) {
          globalObject.properties.push(stubs);
          transformed = true;
        }

        if (globalObject.properties.length > 0
          && !mount.properties.some((prop) => prop.type === 'Property' && prop.key.type === 'Identifier' && prop.key.name === 'global')) {
          const prop = scriptBuilders.property('init', scriptBuilders.identifier('global'), globalObject);
          mount.properties.push(prop);
          transformed = true;
        }

        if (transformed) {
          count++;
        }
      }

      // get rid of empty statements left by removing localVue calls
      scriptAST.body = scriptAST.body.filter((v) => v.type !== 'ExpressionStatement' || v.expression);
    }

    return count;
  },
};
