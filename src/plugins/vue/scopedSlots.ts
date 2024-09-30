import { CodemodPlugin } from 'vue-metamorph';

export const scopedSlotsPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-scoped-slots',
  transform({ scriptASTs, sfcAST, utils: { astHelpers, builders } }) {
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
        id.property = builders.identifier('$slots');
      });
    }

    if (sfcAST) {
      astHelpers.findAll(sfcAST, {
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
