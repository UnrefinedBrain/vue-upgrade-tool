import { ManualMigrationPlugin } from 'vue-metamorph';

export const filtersPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'filters',
  find({ sfcAST, report, utils: { astHelpers } }) {
    if (sfcAST) {
      astHelpers.findAll(sfcAST, {
        type: 'VFilterSequenceExpression',
      }).forEach((node) => {
        report(node, 'Filters have been removed.\nSee: https://v3-migration.vuejs.org/breaking-changes/filters.html#filters');
      });
    }
  },
};
