import { CodemodPlugin } from 'vue-metamorph';

export const vueRouterInstantiationPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-router-instantiation',
  transform(scriptAST, _templateAST, _filename, { traverseScriptAST, scriptBuilders: sb }) {
    let count = 0;
    if (scriptAST) {
      traverseScriptAST(scriptAST, {
        visitImportDeclaration(path) {
          if (path.node.source.value === 'vue-router') {
            path.node.specifiers = [
              sb.importNamespaceSpecifier(
                sb.identifier('VueRouter'),
              ),
            ];
          }

          return this.traverse(path);
        },

        visitNewExpression(path) {
          if (path.node.callee.type === 'Identifier'
            && path.node.callee.name === 'VueRouter') {
            count++;
            path.replace(
              sb.callExpression(
                sb.memberExpression(
                  sb.identifier('VueRouter'),
                  sb.identifier('createRouter'),
                ),
                path.node.arguments,
              ),
            );

            return false;
          }
          return this.traverse(path);
        },
      });
    }

    return count;
  },
};
