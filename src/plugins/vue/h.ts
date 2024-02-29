import { CodemodPlugin, namedTypes } from 'vue-metamorph';

export const contextualHPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'contextual-h',
  transform(scriptASTs, _sfcAST, _filename, utils) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      let addImport = false;
      const renames: {
        node: namedTypes.FunctionExpression | namedTypes.ArrowFunctionExpression
        name: string;
      }[] = [];

      // find render functions
      utils.traverseScriptAST(scriptAST, {
        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'ThisExpression'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.property.name === '$createElement') {
            addImport = true;
            count++;
            path.node.callee = utils.scriptBuilders.identifier('h');
          }

          this.traverse(path);
        },

        visitProperty(path) {
          if (path.node.key.type === 'Identifier'
            && path.node.key.name === 'render'
            && (path.node.value.type === 'FunctionExpression' || path.node.value.type === 'ArrowFunctionExpression')) {
            if (path.node.value.params[0]?.type === 'Identifier') {
              const paramName = path.node.value.params[0].name;
              if (paramName !== 'h') {
                renames.push({
                  node: path.node.value,
                  name: paramName,
                });
              }

              addImport = true;
              path.node.value.params = [];
              count++;
            }
          }

          this.traverse(path);
        },
      });

      // if render functions used some name other than `h`, rename those function calls to h()
      for (const { node, name } of renames) {
        utils.traverseScriptAST(node, {
          visitCallExpression(path) {
            if (path.node.callee.type === 'Identifier'
              && path.node.callee.name === name) {
              path.node.callee.name = 'h';
            }

            this.traverse(path);
          },
        });
      }

      if (addImport) {
        utils.astHelpers.createNamedImport(scriptAST, 'vue', 'h');
      }
    }

    return count;
  },
};
