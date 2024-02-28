import { CodemodPlugin } from 'vue-metamorph';
import * as changeCase from 'change-case';

export const transitionGroupRootElementPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'transition-group-root-element',
  transform(_scriptASTs, sfcAST, _filename, { traverseTemplateAST, templateBuilders }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement'
            && changeCase.pascalCase(node.rawName) === 'TransitionGroup'
            && !node.startTag.attributes.some((attr) => {
              if (attr.directive && attr.key.name.name === 'bind'
                && attr.key.argument?.type === 'VIdentifier'
                && attr.key.argument.name === 'tag') {
                return true;
              }

              if (!attr.directive && attr.key.name === 'tag') {
                return true;
              }

              return false;
            })) {
            count++;
            node.startTag.attributes.push(
              templateBuilders.vAttribute(
                templateBuilders.vIdentifier('tag'),
                templateBuilders.vLiteral('span'),
              ),
            );
          }
        },
      });
    }

    return count;
  },
};
