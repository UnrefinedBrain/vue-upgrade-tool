//@ts-nocheck
import { CodemodPlugin } from 'vue-metamorph';

export const vTextFieldPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-text-field',
  transform({ sfcAST, utils: { traverseTemplateAST, builders } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-text-field') {
            for (const attr of node.startTag.attributes) {
              if (attr.key?.name === 'class') {
                const value = attr.value?.value;
                if (value) {
                  // Replace filled with variant="plain"
                  if (value.includes('filled')) {
                    attr.value.value = value.replace('filled', 'variant="plain"');
                    count++;
                  }
                  // Replace append-icon="mdi-magnify" with prepend-inner-icon="fa:fas fa-search"
                  if (value.includes('append-icon="mdi-magnify"')) {
                    attr.value.value = value.replace(
                      'append-icon="mdi-magnify"',
                      'prepend-inner-icon="fa:fas fa-search"'
                    );
                    count++;
                  }
                }
              }

              // Replace @input with @update:modelValue
              if (attr.key?.name === 'on') {
                const onValue = attr.value?.properties.find(
                  (prop) => prop.key?.name === 'input'
                );
                if (onValue) {
                  onValue.key.name = 'update:modelValue';
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