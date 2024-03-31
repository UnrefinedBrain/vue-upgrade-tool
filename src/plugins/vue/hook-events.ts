import { CodemodPlugin } from 'vue-metamorph';

export const hookEventsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'hook-events',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VDirectiveKey'
            && node.name.name === 'on'
            && node.argument?.type === 'VIdentifier'
            && node.argument.name.startsWith('hook:')) {
            node.argument.rawName = node.argument.name.replace(/^hook:/, 'vue:');
            count++;
          }
        },
      });
    }
    return count;
  },
};
