import { ManualMigrationPlugin } from 'vue-metamorph';

export const routerAppPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'router.app',
  find({
    scriptASTs,
    sfcAST,
    report,
    utils: { astHelpers },
  }) {
    const message = 'router.app was removed.\nSee: https://router.vuejs.org/guide/migration/#Removal-of-router-app';
    const matcher1 = {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: 'router',
      },
      property: {
        type: 'Identifier',
        name: 'app',
      },
    } as const;

    const matcher2 = {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: '$router',
      },
      property: {
        type: 'Identifier',
        name: 'app',
      },
    } as const;

    const matcher3 = {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        object: {
          type: 'ThisExpression',
        },
        property: {
          type: 'Identifier',
          name: '$router',
        },
      },
      property: {
        type: 'Identifier',
        name: 'app',
      },
    } as const;

    if (sfcAST) {
      [
        ...astHelpers.findAll(sfcAST, matcher1),
        ...astHelpers.findAll(sfcAST, matcher2),
      ]
        .forEach((node) => {
          report(node, message);
        });
    }

    for (const scriptAST of scriptASTs) {
      [
        ...astHelpers.findAll(scriptAST, matcher1),
        ...astHelpers.findAll(scriptAST, matcher2),
        ...astHelpers.findAll(scriptAST, matcher3),
      ]
        .forEach((node) => {
          report(node, message);
        });
    }
  },
};
