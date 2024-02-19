import { ManualMigrationPlugin } from 'vue-metamorph';

export const childrenPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'children',
  find(scriptASTs, sfcAST, _filename, report, { astHelpers }) {
    const message = '$children has been removed.\nSee: https://v3-migration.vuejs.org/breaking-changes/children.html#children';

    for (const scriptAST of scriptASTs) {
      astHelpers.findAll(scriptAST, {
        type: 'Identifier',
        name: '$children',
      }).forEach((node) => {
        report(node, message);
      });
    }

    if (sfcAST) {
      astHelpers.findAll(sfcAST, {
        type: 'Identifier',
        name: '$children',
      }).forEach((node) => {
        report(node, message);
      });
    }
  },
};
