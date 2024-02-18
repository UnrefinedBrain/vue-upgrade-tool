import { ManualMigrationPlugin } from 'vue-metamorph';

export const catchAllPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'vue-router-catch-all',
  find(scriptASTs, _sfcAST, _filename, report, { traverseScriptAST }) {
    for (const scriptAST of scriptASTs) {
      traverseScriptAST(scriptAST, {
        visitProperty(path) {
          if (path.node.value.type !== 'Literal' || path.node.value.value !== '*') {
            return this.traverse(path);
          }

          if ((path.node.key.type === 'Identifier' && path.node.key.name === 'path')
            || (path.node.key.type === 'Literal' && path.node.key.value === 'path')) {
            report(path.node, 'Catch-all routes must now be defined as \'/:pathMatch(.*)*\'\nSee: https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes');
          }

          return this.traverse(path);
        },
      });
    }
  },
};
