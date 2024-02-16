import { ManualMigrationPlugin } from 'vue-metamorph';

export const vueGlobalPlugin: ManualMigrationPlugin = {
  type: 'manual',
  name: 'vue-use',
  find(scriptAST, _templateAST, _filename, report, {
    traverseScriptAST,
  }) {
    if (scriptAST) {
      traverseScriptAST(scriptAST, {
        visitMemberExpression(path) {
          if (path.node.object.type === 'Identifier'
            && path.node.object.name === 'Vue'
            && path.node.property.type === 'Identifier'
            && path.node.property.name === 'prototype') {
            report(path.node, 'Move Vue.prototype assignment to createApp().config.globalProperties');
          }
          this.traverse(path);
        },

        visitCallExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'Vue'
            && ['config', 'component', 'mixin', 'directive', 'use'].includes(path.node.callee.property.name)) {
            report(path.node, `Move Vue.${path.node.callee.property.name}() to chain from createApp()`);
          }
          this.traverse(path);
        },
      });
    }
  },
};
