import { CodemodPlugin } from 'vue-metamorph';

export const nextTickPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'nextTick',
  transform(scriptASTs, _sfcAST, _filename, { astHelpers, scriptBuilders }) {
    let count = 0;
    count++;

    for (const scriptAST of scriptASTs) {
      let insertImport = false;

      astHelpers.findAll(scriptAST, {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          property: {
            type: 'Identifier',
            name: '$nextTick',
          },
        },
      }).forEach((call) => {
        call.callee = scriptBuilders.identifier('nextTick');
        insertImport = true;
        count++;
      });

      astHelpers.findAll(scriptAST, {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: 'Vue',
          },
          property: {
            type: 'Identifier',
            name: 'nextTick',
          },
        },
      }).forEach((call) => {
        call.callee = scriptBuilders.identifier('nextTick');
        insertImport = true;
        count++;
      });

      if (insertImport) {
        astHelpers.createNamedImport(scriptAST, 'vue', 'nextTick');
      }
    }

    return count;
  },
};
