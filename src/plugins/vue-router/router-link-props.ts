import { AST, ManualMigrationPlugin } from 'vue-metamorph';
import * as changeCase from 'change-case';

export const routerLinkPropsPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'router-link-props',
  find({ sfcAST, report, utils: { traverseTemplateAST } }) {
    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        enterNode(node) {
          if (node.type === 'VElement'
            && changeCase.pascalCase(node.rawName) === 'RouterLink') {
            for (const attr of node.startTag.attributes) {
              if (attr.directive
                && (attr.key.name.name !== 'bind' || !attr.key.argument || attr.key.argument.type !== 'VIdentifier')
              ) {
                continue;
              }

              const name = attr.directive
                ? (attr.key.argument as AST.VIdentifier).name
                : attr.key.name;

              if (name === 'append') {
                report(attr, 'The \'append\' attribute was removed from router-link\nSee: https://router.vuejs.org/guide/migration/#Removal-of-append-prop-in-router-link-');
              }

              if (name === 'event') {
                report(attr, 'The \'event\' attribute was removed from router-link\nSee: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-');
              }

              if (name === 'tag') {
                report(attr, 'The \'tag\' attribute was removed from router-link\nSee: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-');
              }

              if (name === 'exact') {
                report(attr, 'The \'exact\' attribute was removed from router-link\nSee: https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-');
              }
            }
          }
        },
      });
    }
  },
};
