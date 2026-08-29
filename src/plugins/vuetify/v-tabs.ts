import { CodemodPlugin } from 'vue-metamorph';

export const vTabsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-tabs',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-tabs-items') {
            node.rawName = 'v-window';
            count++;
          }
          if (node.type === 'VElement' && node.rawName === 'v-tab-item') {
            node.rawName = 'v-window-item';
            count++;
          }
        },
      });
    }

    return count;
  },
};