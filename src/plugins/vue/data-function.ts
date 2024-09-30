import { CodemodPlugin } from 'vue-metamorph';

export const dataFunctionPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-data-function',
  transform({ scriptASTs, utils: { traverseScriptAST, builders } }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      traverseScriptAST(scriptAST, {
        visitNewExpression(path) {
          if (path.node.callee.type === 'Identifier'
            && path.node.callee.name === 'Vue'
            && path.node.arguments[0]?.type === 'ObjectExpression') {
            const options = path.node.arguments[0];
            for (const property of options.properties) {
              if (property.type === 'Property'
                && property.key.type === 'Identifier'
                && property.key.name === 'data'
                && property.value.type === 'ObjectExpression') {
                property.value = builders.arrowFunctionExpression([], property.value);
                count++;
              }
            }
          }
          this.traverse(path);
        },
      });
    }

    return count;
  },
};
