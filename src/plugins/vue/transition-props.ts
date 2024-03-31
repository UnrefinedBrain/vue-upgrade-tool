import { CodemodPlugin } from 'vue-metamorph';

const replacements: Record<string, string> = {
  'leave-class': 'leave-from-class',
  'enter-class': 'enter-from-class',
};

export const transitionPropsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'transition-props',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement' && node.rawName === 'transition') {
            for (const attr of node.startTag.attributes) {
              if (!attr.directive
                  && replacements[attr.key.rawName]) {
                attr.key.rawName = replacements[attr.key.rawName]!;
                count++;
              }

              if (attr.directive
                && attr.key.name.name === 'bind'
                && attr.key.argument?.type === 'VIdentifier'
                && replacements[attr.key.argument.rawName]) {
                attr.key.argument.rawName = replacements[attr.key.argument.rawName]!;
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
