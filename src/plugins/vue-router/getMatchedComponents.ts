import { builders as sb, CodemodPlugin } from 'vue-metamorph';

const replacement = () => sb.callExpression(
  sb.memberExpression(
    sb.memberExpression(
      sb.memberExpression(
        sb.memberExpression(
          sb.identifier('router'),
          sb.identifier('currentRoute'),
        ),
        sb.identifier('value'),
      ),
      sb.identifier('matched'),
    ),
    sb.identifier('flatMap'),
  ),
  [
    sb.arrowFunctionExpression(
      [sb.identifier('record')],
      sb.callExpression(
        sb.memberExpression(
          sb.identifier('Object'),
          sb.identifier('values'),
        ),
        [
          sb.memberExpression(
            sb.identifier('record'),
            sb.identifier('components'),
          ),
        ],
      ),
    ),
  ],
);

export const getMatchedComponentsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-router-getMatchedComponents',
  transform({ scriptASTs, utils: { traverseScriptAST } }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      traverseScriptAST(scriptAST, {
        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'router'
            && path.node.callee.property.name === 'getMatchedComponents') {
            path.replace(replacement());
            count++;
          }

          this.traverse(path);
        },
      });
    }

    return count;
  },
};
