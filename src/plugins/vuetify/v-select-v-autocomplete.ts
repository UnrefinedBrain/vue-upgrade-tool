//@ts-nocheck
import { CodemodPlugin } from 'vue-metamorph';

export const vSelectVAutocompletePlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-select-v-autocomplete',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && ['v-select', 'v-combobox', 'v-autocomplete'].includes(node.rawName)) {
            for (const attr of node.startTag.attributes) {
              if (attr.key?.name === 'on' && attr.value?.type === 'VObjectExpression') {
                const inputHandler = attr.value.properties.find(
                  (prop) => prop.key?.type === 'VIdentifier' && prop.key.name === 'input'
                );

                if (inputHandler) {
                  inputHandler.key.name = 'update:modelValue';
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