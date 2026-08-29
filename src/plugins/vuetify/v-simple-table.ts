import { CodemodPlugin } from 'vue-metamorph';

export const vSimpleTablePlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-simple-table',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-simple-table') {
            node.rawName = 'v-table';
            count++;
          }
        },
      });
    }

    return count;
  },
};