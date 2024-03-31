import { CodemodPlugin, namedTypes, type Kinds } from 'vue-metamorph';

const isVueDelete = (node: namedTypes.CallExpression) => {
  if (node.callee.type !== 'MemberExpression') {
    return false;
  }

  // whatever.$delete()
  if (node.callee.property.type === 'Identifier'
    && node.callee.property.name === '$delete') {
    return true;
  }

  // Vue.delete()
  if (node.callee.object.type === 'Identifier'
    && node.callee.property.type === 'Identifier'
    && node.callee.object.name === 'Vue'
    && node.callee.property.name === 'delete') {
    return true;
  }

  return false;
};

const isValid = (node: Kinds.ExpressionKind | namedTypes.SpreadElement | undefined): node is Kinds.ExpressionKind => !!node && node.type !== 'SpreadElement';

export const vueDeletePlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-delete',
  transform({ scriptASTs, utils: { traverseScriptAST, builders } }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      traverseScriptAST(scriptAST, {
        visitCallExpression(path) {
          if (isVueDelete(path.node)) {
            const [target, property] = path.node.arguments;
            if (!isValid(target) || !isValid(property)) {
              return this.traverse(path);
            }

            const newKey = property.type === 'Literal' && typeof property.value === 'string'
              ? builders.identifier(property.value)
              : property;
            count++;
            path.replace(
              builders.unaryExpression(
                'delete',
                builders.memberExpression(
                  target,
                  newKey,
                  property.type !== 'Literal',
                ),
              ),
            );
            return false;
          }

          return this.traverse(path);
        },
      });
    }

    return count;
  },
};
