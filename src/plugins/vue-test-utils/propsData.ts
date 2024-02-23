import { CodemodPlugin } from 'vue-metamorph';
import { findMounts, isTestFile } from './utils';

export const propsDataTestPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'propsData',
  transform(scriptASTs, _sfcAST, filename, { scriptBuilders }) {
    if (!isTestFile(filename)) {
      return 0;
    }

    let count = 0;

    for (const scriptAST of scriptASTs) {
      for (const mount of findMounts(scriptAST)) {
        for (const prop of mount.properties) {
          if (prop.type === 'Property'
            && prop.key.type === 'Identifier'
            && prop.key.name === 'propsData') {
            prop.key = scriptBuilders.identifier('props');
            prop.shorthand = false;
            count++;
          }
        }
      }
    }

    return count;
  },
};
