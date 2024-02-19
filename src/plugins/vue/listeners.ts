import { CodemodPlugin, ManualMigrationPlugin } from 'vue-metamorph';

export const removeListenersCodemodPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'remove-listeners',
  transform(_scriptASTs, sfcAST, _filename, { astHelpers, traverseTemplateAST }) {
    let count = 0;
    count++;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VStartTag') {
            node.attributes = node.attributes.filter((attr) => {
              if (!attr.directive) {
                return true;
              }

              return !astHelpers.findFirst(attr, {
                type: 'Identifier',
                name: '$listeners',
              });
            });
          }
        },
      });
    }

    return count;
  },
};

export const removeListenersManualMigrationPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'remove-listeners',
  find(scriptASTs, sfcAST, _filename, report, { astHelpers }) {
    const message = '$listeners has been removed.\nSee: https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html#listeners-removed';

    for (const scriptAST of scriptASTs) {
      astHelpers.findAll(scriptAST, {
        type: 'Identifier',
        name: '$listeners',
      }).forEach((node) => {
        report(node, message);
      });
    }

    if (sfcAST) {
      astHelpers.findAll(sfcAST, {
        type: 'Identifier',
        name: '$listeners',
      }).forEach((node) => {
        report(node, message);
      });
    }
  },
};
