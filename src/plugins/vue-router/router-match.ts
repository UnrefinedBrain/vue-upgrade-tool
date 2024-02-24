import { ManualMigrationPlugin } from 'vue-metamorph';

export const routerMatchPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'router-match',
  find(scriptASTs, _sfcAST, _filename, report, { astHelpers }) {
    for (const scriptAST of scriptASTs) {
      astHelpers
        .findAll(scriptAST, {
          type: 'CallExpression',
          callee: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'router',
            },
            property: {
              type: 'Identifier',
              name: 'match',
            },
          },
        })
        .forEach((node) => {
          report(node, 'router.match() was removed\nSee: https://router.vuejs.org/guide/migration/#Removal-of-router-match-and-changes-to-router-resolve');
        });
    }
  },
};
