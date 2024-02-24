import { CodemodPlugin } from 'vue-metamorph';
import * as changeCase from 'change-case';

export const routerViewSlotContentPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'router-view-slot-content',
  transform(
    _scriptASTs,
    sfcAST,
    _filename,
    {
      astHelpers, templateBuilders, scriptBuilders, traverseTemplateAST,
    },
  ) {
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
            const prop = scriptBuilders.property(
              'init',
              scriptBuilders.identifier('Component'),
              scriptBuilders.identifier('Component'),
            );

            prop.shorthand = true;

            node.startTag.attributes.push(
              templateBuilders.vDirective(
                templateBuilders.vDirectiveKey(
                  templateBuilders.vIdentifier('slot', 'slot'),
                ),
                templateBuilders.vExpressionContainer(
                  scriptBuilders.objectPattern([
                    prop,
                  ]),
                ),
              ),
            );

            node.children = [
              templateBuilders.vText('\n'),
              templateBuilders.vElement(
                'component',
                templateBuilders.vStartTag(
                  [
                    templateBuilders.vDirective(
                      templateBuilders.vDirectiveKey(
                        templateBuilders.vIdentifier('bind', ':'),
                        templateBuilders.vIdentifier('is'),
                      ),
                      templateBuilders.vExpressionContainer(
                        scriptBuilders.identifier('Component'),
                      ),
                    ),
                  ],
                  false,
                ),
                node.children,
              ),
              templateBuilders.vText('\n'),
            ];
          }
        },
      });
    }

    return count;
  },
};
