import { CodemodPlugin } from 'vue-metamorph';

export const vListItemGroupValuePlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-list-item-group-value',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-list-item-group') {
            for (const attr of node.startTag.attributes) {
              if (attr.key?.name === 'value') {
                attr.key.name = 'modelValue';
                count++;
              }
            }
          }
        },
      });
    }

    return count;
  },
};