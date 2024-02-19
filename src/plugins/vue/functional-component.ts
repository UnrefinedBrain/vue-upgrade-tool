import { CodemodPlugin } from 'vue-metamorph';

export const functionalComponentPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'functional-component',
  transform(scriptASTs, sfcAST, filename, { astHelpers }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      for (const options of astHelpers.findVueComponentOptions(scriptAST, filename.endsWith('.vue'))) {
        options.properties = options.properties.filter((prop) => {
          if (prop.type === 'Property'
            && prop.key.type === 'Identifier'
            && prop.key.name === 'functional') {
            count++;
            return false;
          }

          return true;
        });
      }
    }

    if (sfcAST) {
      for (const child of sfcAST.children) {
        if (child.type === 'VElement'
          && child.name === 'template') {
          const attrCount = child.startTag.attributes.length;

          child.startTag.attributes = child.startTag.attributes.filter((attr) => !attr.directive && attr.key.name !== 'functional');

          if (child.startTag.attributes.length !== attrCount) {
            count++;
          }
        }
      }
    }

    return count;
  },
};
