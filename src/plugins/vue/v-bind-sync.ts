import { CodemodPlugin } from 'vue-metamorph';

export const vBindSyncPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-v-bind-sync',
  transform({ sfcAST, utils: { astHelpers } }) {
    let count = 0;

    if (sfcAST) {
      const binds = astHelpers.findAll(sfcAST, {
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
