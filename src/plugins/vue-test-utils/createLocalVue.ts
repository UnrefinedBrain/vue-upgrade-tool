import { ManualMigrationPlugin } from 'vue-metamorph';
import { isTestFile } from './utils';

export const createLocalVuePlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'test-utils-createLocalVue',
  find({
    scriptASTs,
    filename,
    report,
    utils: { astHelpers },
  }) {
    if (!isTestFile(filename)) {
      return;
    }

    const message = 'localVue was removed\nSee: https://test-utils.vuejs.org/migration/#No-more-createLocalVue';

    for (const scriptAST of scriptASTs) {
      astHelpers
        .findAll(scriptAST, {
          type: 'Identifier',
          name: 'localVue',
        })
        .forEach((node) => {
          if (node.loc) {
            report(node, message);
          }
        });

      astHelpers
        .findAll(scriptAST, {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'createLocalVue',
          },
        })
        .forEach((node) => {
          report(node, message);
        });
    }
  },
};
