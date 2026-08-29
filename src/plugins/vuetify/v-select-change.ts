//@ts-nocheck
import { CodemodPlugin } from 'vue-metamorph';

export const vSelectChangePlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-select-change',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-select') {
            for (const attr of node.startTag.attributes) {
              if (attr.key?.name === 'on' && attr.value?.type === 'VObjectExpression') {
                const changeHandler = attr.value.properties.find(
                  (prop) => prop.key?.type === 'VIdentifier' && prop.key.name === 'change'
                );

                if (changeHandler) {
                  changeHandler.key.name = 'update:modelValue';
                  count++;
                }
              }
            }
          }
        },
      });
    }

    return count;
  },
};