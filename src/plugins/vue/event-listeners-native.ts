import { CodemodPlugin } from 'vue-metamorph';

export const eventListenersNativePlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-v-on-native',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VAttribute'
            && node.directive
            && node.key.name.name === 'on') {
            const withoutNativeModifiers = node.key.modifiers
              .filter((modifier) => modifier.name !== 'native');

            if (node.key.modifiers.length !== withoutNativeModifiers.length) {
              count++;
            }
            node.key.modifiers = withoutNativeModifiers;
          }
        },
      });
    }

    return count;
  },
};
