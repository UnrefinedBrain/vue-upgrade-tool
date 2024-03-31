import { ManualMigrationPlugin } from 'vue-metamorph';

export const isAttributePlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'is-attribute',
  find({ sfcAST, report, utils: { traverseTemplateAST } }) {
    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          const message = 'The \'is\' attribute can only be used on a <component> tag\nSee: https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html#customized-built-in-elements';
          if (node.type === 'VElement'
            && node.name !== 'component') {
            for (const attr of node.startTag.attributes) {
              if (attr.directive && attr.key.name.name === 'bind'
                && attr.key.argument?.type === 'VIdentifier'
                && attr.key.argument.name === 'is') {
                report(attr, message);
              }

              if (!attr.directive && attr.key.name === 'is') {
                report(attr, message);
              }
            }
          }
        },
      });
    }
  },
};
