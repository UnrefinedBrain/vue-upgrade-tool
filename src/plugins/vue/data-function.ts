import { CodemodPlugin } from 'vue-metamorph';

export const dataFunctionPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'data-function',
  transform(scriptASTs, _sfcAST, filename, { astHelpers, scriptBuilders }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      for (const options of astHelpers.findVueComponentOptions(scriptAST, filename.endsWith('.vue'))) {
        for (const property of options.properties) {
          if (property.type === 'Property'
            && property.key.type === 'Identifier'
            && property.key.name === 'data'
            && property.value.type === 'ObjectExpression') {
            property.value = scriptBuilders.arrowFunctionExpression([], property.value);
            count++;
          }
        }
      }
    }

    return count;
  },
};
