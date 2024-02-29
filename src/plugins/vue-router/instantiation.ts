import { CodemodPlugin } from 'vue-metamorph';

export const vueRouterInstantiationPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-router-instantiation',
  transform(scriptASTs, _templateAST, _filename, {
    astHelpers,
    traverseScriptAST,
    scriptBuilders: sb,
  }) {
    let count = 0;
    for (const scriptAST of scriptASTs) {
      let insertImport = false;
      traverseScriptAST(scriptAST, {
        visitNewExpression(path) {
          if (path.node.callee.type === 'Identifier'
            && path.node.callee.name === 'VueRouter') {
            insertImport = true;
            count++;
            path.replace(
              sb.callExpression(
                sb.identifier('createRouter'),
                path.node.arguments,
              ),
            );

            return false;
          }
          return this.traverse(path);
        },
      });

      if (insertImport) {
        astHelpers.createNamedImport(scriptAST, 'vue-router', 'createRouter');
      }
    }

    return count;
  },
};
