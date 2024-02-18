import { CodemodPlugin, ManualMigrationPlugin } from 'vue-metamorph';

export const wrapperDestroyCodemodPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'wrapper-destroy',
  transform(scriptASTs, _sfcAst, filename, utils) {
    let count = 0;

    if (scriptASTs[0] && (filename.includes('.spec') || filename.includes('.test'))) {
      utils.astHelpers.findAll(scriptASTs[0], {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'wrapper',
          },
          property: {
            type: 'Identifier',
            name: 'destroy',
          },
        },
      })
        .forEach((call) => {
          if (call.callee.type === 'MemberExpression'
            && call.callee.property.type === 'Identifier') {
            call.callee.property.name = 'unmount';
            count++;
          }
        });
    }

    return count;
  },
};

export const wrapperDestroyManualMigrationPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'wrapper-destroy-manual',
  find(scriptASTs, sfcAST, filename, report, utils) {
    if (scriptASTs[0] && (filename.includes('.spec') || filename.includes('.test'))) {
      utils.astHelpers.findAll(scriptASTs[0], {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          property: {
            type: 'Identifier',
            name: 'destroy',
          },
        },
      })
        .forEach((call) => {
          if (call.callee.type === 'MemberExpression'
            && call.callee.property.type === 'Identifier'
            && call.callee.property.name === 'destroy') {
            report(call.callee, 'Possibly rename destroy() to unmount()\nSee: https://test-utils.vuejs.org/migration/#destroy-is-now-unmount-to-match-Vue-3');
          }
        });
    }
  },
};
