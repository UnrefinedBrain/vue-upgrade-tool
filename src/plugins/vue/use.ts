import { ManualMigrationPlugin } from 'vue-metamorph';

export const vueUsePlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'vue-use',
  find(scriptAST, _templateAST, _filename, report, {
    traverseScriptAST,
  }) {
    if (scriptAST) {
      traverseScriptAST(scriptAST, {
        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'Vue'
            && path.node.callee.property.name === 'use') {
            report(path.node, 'Move Vue.use() to chain from createApp()');
          }
          this.traverse(path);
        },
      });
    }
  },
};
