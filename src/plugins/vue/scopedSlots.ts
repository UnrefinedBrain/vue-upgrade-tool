import { CodemodPlugin } from 'vue-metamorph';

export const scopedSlotsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'scoped-slots',
  transform(scriptASTs, templateAST, _filename, { astHelpers, scriptBuilders }) {
    let count = 0;
    for (const scriptAST of scriptASTs) {
      astHelpers.findAll(scriptAST, {
        type: 'MemberExpression',
        property: {
          type: 'Identifier',
          name: '$scopedSlots',
        },
      }).forEach((id) => {
        count++;
        id.property = scriptBuilders.identifier('$slots');
      });
    }

    if (templateAST) {
      astHelpers.findAll(templateAST, {
        type: 'Identifier',
        name: '$scopedSlots',
      }).forEach((id) => {
        count++;
        id.name = '$slots';
      });
    }

    return count;
  },
};
