import { ManualMigrationPlugin } from 'vue-metamorph';

export const propsDefaultThisPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'props-default-this',
  find(scriptASTs, _sfcAST, filename, report, { astHelpers }) {
    const message = 'Props default functions can no longer access `this`\nSee: https://v3-migration.vuejs.org/breaking-changes/props-default-this.html';

    for (const scriptAST of scriptASTs) {
      for (const options of astHelpers.findVueComponentOptions(scriptAST, filename.endsWith('.vue'))) {
        for (const prop of options.properties) {
          if (prop.type === 'Property'
            && prop.key.type === 'Identifier'
            && prop.key.name === 'props') {
            astHelpers.findAll(prop.value, {
              type: 'MemberExpression',
              object: {
                type: 'ThisExpression',
              },
            }).forEach((node) => {
              report(node, message);
            });
          }
        }
      }
    }
  },
};
