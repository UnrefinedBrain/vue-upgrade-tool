import { CodemodPlugin } from 'vue-metamorph';

export const vVirtualScrollPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-virtual-scroll',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-virtual-scroll') {
            node.rawName = 'RecycleScroller';
            count++;
          }
        },
      });
    }

    return count;
  },
};