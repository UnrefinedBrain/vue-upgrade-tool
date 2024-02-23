import { namedTypes, traverseScriptAST } from 'vue-metamorph';

export const isTestFile = (filename: string) => /\.(spec|test)\.[jt]sx?$/.test(filename);

export const findMounts = (ast: namedTypes.Program) => {
  const mounts: namedTypes.ObjectExpression[] = [];

  traverseScriptAST(ast, {
    visitCallExpression(path) {
      if (path.node.callee.type === 'Identifier'
        && ['mount', 'shallowMount'].includes(path.node.callee.name)
        && path.node.arguments[1]?.type === 'ObjectExpression') {
        mounts.push(path.node.arguments[1]);
      }

      this.traverse(path);
    },
  });

  return mounts;
};
