import { CodemodPlugin } from 'vue-metamorph';
import * as changeCase from 'change-case';

export const routerViewSlotContentPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-router-view-slot-content',
  transform({
    sfcAST,
    utils: {
      astHelpers,
      builders,
      traverseTemplateAST,
    },
  }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VElement'
            && changeCase.pascalCase(node.rawName) === 'RouterView'
            && node.children.length > 0
            && !astHelpers.findFirst(node, { type: 'VElement', rawName: 'component' })) {
            count++;
            node.startTag.selfClosing = false;
            const prop = builders.property(
              'init',
              builders.identifier('Component'),
              builders.identifier('Component'),
            );

            prop.shorthand = true;

            node.startTag.attributes.push(
              builders.vDirective(
                builders.vDirectiveKey(
                  builders.vIdentifier('slot', 'slot'),
                ),
                builders.vExpressionContainer(
                  builders.objectPattern([
                    prop,
                  ]),
                ),
              ),
            );

            node.children = [
              builders.vText('\n'),
              builders.vElement(
                'component',
                builders.vStartTag(
                  [
                    builders.vDirective(
                      builders.vDirectiveKey(
                        builders.vIdentifier('bind', ':'),
                        builders.vIdentifier('is'),
                      ),
                      builders.vExpressionContainer(
                        builders.identifier('Component'),
                      ),
                    ),
                  ],
                  false,
                ),
                node.children,
              ),
              builders.vText('\n'),
            ];
          }
        },
      });
    }

    return count;
  },
};
