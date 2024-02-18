import { CodemodPlugin } from 'vue-metamorph';

export const hookEventsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'hook-events',
  transform(_scriptASTs, sfcAst, _filename, { traverseTemplateAST }) {
    let count = 0;

    if (sfcAst) {
      traverseTemplateAST(sfcAst, {
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
