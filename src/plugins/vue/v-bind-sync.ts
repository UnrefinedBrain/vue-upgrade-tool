import { CodemodPlugin } from 'vue-metamorph';

export const vBindSyncPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'v-bind-sync',
  transform(_scriptASTs, sfcAst, _filename, { astHelpers }) {
    let count = 0;

    if (sfcAst) {
      const binds = astHelpers.findAll(sfcAst, {
        type: 'VDirectiveKey',
        name: {
          type: 'VIdentifier',
          name: 'bind',
        },
      });

      for (const bind of binds) {
        if (bind.modifiers.some((m) => m.name === 'sync')) {
          bind.name.name = 'model';
          bind.name.rawName = 'model';
          bind.modifiers = bind.modifiers.filter((m) => m.name !== 'sync');

          count++;
        }
      }
    }

    return count;
  },
};
