//@ts-nocheck
import { CodemodPlugin } from 'vue-metamorph';

export const vTooltipActivatorsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-tooltip-activators',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-tooltip') {
            for (const attr of node.startTag.attributes) {
              if (attr.key?.name === 'activator') {
                attr.key.name = 'props';
                count++;
              }
              if (attr.key?.name === 'on') {
                const onValue = attr.value?.properties.find(
                  (prop) => prop.key?.name === 'on'
                );
                if (onValue) {
                  onValue.key.name = 'props';
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