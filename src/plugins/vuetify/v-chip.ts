//@ts-nocheck
import { CodemodPlugin } from 'vue-metamorph';

export const vChipPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-v-chip',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'v-chip') {
            for (const attr of node.startTag.attributes) {
              if (['small', 'large'].includes(attr.key?.name)) {
                attr.key.name = 'size';
                count++;
              }

              if (attr.key?.name === 'class') {
                const value = attr.value?.value;
                if (value) {
                  const colorMap = {
                    'primary': 'primary',
                    'secondary': 'secondary',
                    'success': 'success',
                    'warning': 'warning',
                    'error': 'error',
                  };

                  Object.entries(colorMap).forEach(([from, to]) => {
                    if (value.includes(from)) {
                      node.startTag.attributes.push({
                        key: { name: 'color' },
                        value: { type: 'VLiteral', value: `"${to}"` },
                      });
                      attr.value.value = value.replace(from, '');
                      count++;
                    }
                  });
                }
              }

              if (!node.startTag.attributes.some((a) => a.key?.name === 'variant')) {
                node.startTag.attributes.push({
                  key: { name: 'variant' },
                  value: { type: 'VLiteral', value: '"flat"' },
                });
                count++;
              }
            }
          }
        },
      });
    }

    return count;
  },
};