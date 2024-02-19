import { CodemodPlugin } from 'vue-metamorph';

export const onReadyPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'router-onReady',
  transform(scriptASTs, _sfcAST, _filename, { scriptBuilders: sb, traverseScriptAST }) {
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
            let p = sb.callExpression(
              sb.memberExpression(
                sb.callExpression(
                  sb.memberExpression(
                    sb.identifier('router'),
                    sb.identifier('isReady'),
                  ),
                  [],
                ),
                sb.identifier('then'),
              ),
              [path.node.arguments[0]],
            );

            if (path.node.arguments[1]) {
              p = sb.callExpression(
                sb.memberExpression(p, sb.identifier('catch')),
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
