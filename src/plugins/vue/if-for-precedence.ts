import { ManualMigrationPlugin } from 'vue-metamorph';

export const ifForPrecedencePlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'vue-if-for-precedence',
  find({ sfcAST, report, utils: { traverseTemplateAST } }) {
    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        enterNode(node) {
          if (node.type === 'VElement') {
            let hasIf = false;
            let hasFor = false;

            for (const attribute of node.startTag.attributes) {
              if (attribute.directive) {
                if (attribute.key.name.rawName === 'if') {
                  hasIf = true;
                }

                if (attribute.key.name.rawName === 'for') {
                  hasFor = true;
                }
              }
            }

            if (hasIf && hasFor) {
              report(node.startTag, 'v-if/v-for precedence has changed\nSee: https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html');
            }
          }
        },
      });
    }
  },
};
