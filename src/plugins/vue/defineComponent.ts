import { CodemodPlugin, namedTypes } from 'vue-metamorph';

export const defineComponentPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'defineComponent',
  transform(scriptASTs, _sfcAST, filename, { traverseScriptAST, astHelpers, scriptBuilders }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      let insertImport = false;

      if (filename.endsWith('.vue')) {
        const defaultExport = astHelpers.findFirst(scriptAST, {
          type: 'ExportDefaultDeclaration',
          declaration: {
            type: 'ObjectExpression',
          },
        });

        if (defaultExport) {
          defaultExport.declaration = scriptBuilders.callExpression(
            scriptBuilders.identifier('defineComponent'),
            [defaultExport.declaration as namedTypes.ObjectExpression],
          );

          insertImport = true;
          count++;
        }
      }

      traverseScriptAST(scriptAST, {
        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'Vue'
            && ['component', 'extend'].includes(path.node.callee.property.name)) {
            insertImport = true;
            count++;
            path.node.callee = scriptBuilders.identifier('defineComponent');
          }

          this.traverse(path);
        },
      });

      if (insertImport) {
        astHelpers.createNamedImport(scriptAST, 'vue', 'defineComponent');
      }
    }

    return count;
  },
};
