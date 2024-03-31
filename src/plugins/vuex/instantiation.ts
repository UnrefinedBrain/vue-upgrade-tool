import { CodemodPlugin } from 'vue-metamorph';

export const vuexInstantiationPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuex-instantiation',
  transform({ scriptASTs, utils: { astHelpers, traverseScriptAST, builders } }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      let addImport = false;

      traverseScriptAST(scriptAST, {
        visitNewExpression(path) {
          if (path.node.callee.type === 'MemberExpression'
            && path.node.callee.object.type === 'Identifier'
            && path.node.callee.property.type === 'Identifier'
            && path.node.callee.object.name === 'Vuex'
            && path.node.callee.property.name === 'Store') {
            path.replace(
              builders.callExpression(
                builders.identifier('createStore'),
                path.node.arguments,
              ),
            );
            addImport = true;
            count++;
          }

          return this.traverse(path);
        },
      });

      if (addImport) {
        astHelpers.createNamedImport(scriptAST, 'vuex', 'createStore');
      }
    }

    return count;
  },
};
