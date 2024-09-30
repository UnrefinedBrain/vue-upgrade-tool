import { CodemodPlugin, ManualMigrationPlugin } from 'vue-metamorph';

export const removeListenersCodemodPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-remove-$listeners',
  transform({ sfcAST, utils: { astHelpers, traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VStartTag') {
            node.attributes = node.attributes.filter((attr) => {
              if (!attr.directive) {
                return true;
              }

              const res = !astHelpers.findFirst(attr, {
                type: 'Identifier',
                name: '$listeners',
              });

              if (!res) {
                count++;
              }

              return res;
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
  name: 'vue-remove-$listeners-manual',
  find({
    scriptASTs,
    sfcAST,
    report,
    utils: { astHelpers },
  }) {
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
