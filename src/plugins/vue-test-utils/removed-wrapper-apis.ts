import { ManualMigrationPlugin } from 'vue-metamorph';
import { isTestFile } from './utils';

export const removedWrapperApisPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'removed-wrapper-apis',
  find({
    scriptASTs,
    filename,
    report,
    utils: { traverseScriptAST },
  }) {
    if (!isTestFile(filename)) {
      return;
    }

    const message = (p: string) => `wrapper.${p} was removed.\nSee: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-`;

    const removedMethods = [
      'contains',
      'emittedByOrder',
      'setSelected',
      'setChecked',
      'is',
      'isEmpty',
      'isVueInstance',
      'setMethods',
    ];
    for (const scriptAST of scriptASTs) {
      traverseScriptAST(scriptAST, {
        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'wrapper'
            && removedMethods.includes(path.node.callee.property.name)) {
            report(path.node, message(path.node.callee.property.name));
          }

          this.traverse(path);
        },

        visitMemberExpression(path) {
          if (path.node.object.type === 'Identifier'
            && path.node.property.type === 'Identifier'
            && path.node.object.name === 'wrapper'
            && path.node.property.name === 'name') {
            report(path.node, message('name'));
          }
          this.traverse(path);
        },
      });
    }
  },
};
