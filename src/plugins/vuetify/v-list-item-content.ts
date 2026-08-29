import { CodemodPlugin } from 'vue-metamorph';

export const vListItemContentPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-list-item-content',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-list-item-content') {
            if (node.children.length > 0) {
              node.parent.children.splice(
                node.parent.children.indexOf(node),
                1,
                ...node.children
              );
              count++;
            }
          }
        },
      });
    }

    return count;
  },
};