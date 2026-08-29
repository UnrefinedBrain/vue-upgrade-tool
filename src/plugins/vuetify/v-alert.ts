import { CodemodPlugin } from 'vue-metamorph';

export const vAlertPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-alert',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VAttribute' && node.key?.name === 'type') {
            node.key.name = 'variant';
            count++;
          }
        },
      });
    }

    return count;
  },
};