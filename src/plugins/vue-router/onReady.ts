import { CodemodPlugin } from 'vue-metamorph';

export const onReadyPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-router-onReady',
  transform({ scriptASTs, utils: { builders, traverseScriptAST } }) {
    let count = 0;
    for (const scriptAST of scriptASTs) {
      traverseScriptAST(scriptAST, {
        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'router'
            && path.node.callee.property.name === 'onReady'
            && path.node.arguments[0]) {
            let p = builders.callExpression(
              builders.memberExpression(
                builders.callExpression(
                  builders.memberExpression(
                    builders.identifier('router'),
                    builders.identifier('isReady'),
                  ),
                  [],
                ),
                builders.identifier('then'),
              ),
              [path.node.arguments[0]],
            );

            if (path.node.arguments[1]) {
              p = builders.callExpression(
                builders.memberExpression(p, builders.identifier('catch')),
                [path.node.arguments[1]],
              );
            }

            count++;
            path.replace(p);
            return false;
          }

          return this.traverse(path);
        },
      });
    }

    return count;
  },
};
