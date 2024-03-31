import { CodemodPlugin } from 'vue-metamorph';

const replace: Record<string, string> = {
  destroyed: 'unmounted',
  beforeDestroy: 'beforeUnmount',
};

export const lifecycleHookPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'lifecycle-hooks',
  transform({ scriptASTs, filename, utils: { astHelpers } }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      astHelpers
        .findVueComponentOptions(scriptAST, filename.endsWith('.vue'))
        .forEach((options) => {
          options.properties.forEach((prop) => {
            if (prop.type === 'Property'
              && prop.key.type === 'Identifier'
              && replace[prop.key.name]) {
              prop.key.name = replace[prop.key.name]!;
              count++;
            }
          });
        });
    }

    return count;
  },
};
