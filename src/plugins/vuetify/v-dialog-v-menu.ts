import { CodemodPlugin } from 'vue-metamorph';

export const vDialogVMenuPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-dialog-v-menu',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VAttribute' && node.key?.name === 'value') {
            node.key.name = 'modelValue';
            count++;
          }
        },
      });
    }

    return count;
  },
};