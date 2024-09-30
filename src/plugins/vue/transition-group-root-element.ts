import { CodemodPlugin } from 'vue-metamorph';
import * as changeCase from 'change-case';

export const transitionGroupRootElementPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-transition-group-root-element',
  transform({ sfcAST, utils: { traverseTemplateAST, builders } }) {
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
              builders.vAttribute(
                builders.vIdentifier('tag'),
                builders.vLiteral('span'),
              ),
            );
          }
        },
      });
    }

    return count;
  },
};
