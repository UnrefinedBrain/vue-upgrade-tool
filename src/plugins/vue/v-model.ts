import { AST, CodemodPlugin } from 'vue-metamorph';

const elementsWithValue = [
  'button',
  'input',
  'meter',
  'li',
  'option',
  'progress',
  'param',
];

const isShadowedByFunction = (node?: AST.Node | null): boolean => {
  if (!node) {
    return false;
  }

  if ((node.type === 'FunctionExpression'
    || node.type === 'ArrowFunctionExpression')
    && node.params.some((param) => param.type === 'Identifier' && param.name === 'value')) {
    return true;
  }

  return isShadowedByFunction(node.parent);
};

const isShadowedByVFor = (node?: AST.Node | null): boolean => {
  if (!node) {
    return false;
  }

  if (node.type === 'VElement'
    && node.startTag.attributes.some((attr) => attr.directive
      && attr.key.name.rawName === 'for'
      && attr.value?.expression?.type === 'VForExpression'
      && attr.value.expression.left.some((pattern) => pattern.type === 'Identifier' && pattern.name === 'value'))) {
    return true;
  }

  return isShadowedByVFor(node.parent);
};

export const vModelPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'v-model',
  transform(scriptASTs, sfcAST, filename, { astHelpers, scriptBuilders, traverseTemplateAST }) {
    let count = 0;

    for (const scriptAST of scriptASTs) {
      // 1. rename 'value' prop to 'modelValue'
      astHelpers
        .findVueComponentOptions(scriptAST, filename.endsWith('.vue'))
        .forEach((node) => {
          for (const option of node.properties) {
            if (option.type === 'Property'
              && option.key.type === 'Identifier'
              && option.key.name === 'props'
              && option.value.type === 'ObjectExpression') {
              for (const prop of option.value.properties) {
                if (prop.type === 'Property'
                  && prop.key.type === 'Identifier'
                  && prop.key.name === 'value') {
                  prop.key.name = 'modelValue';
                  count++;
                }
              }

              break;
            }
          }
        });

      // 2. this.value --> this.modelValue
      astHelpers.findAll(scriptAST, {
        type: 'MemberExpression',
        object: {
          type: 'ThisExpression',
        },
        property: {
          type: 'Identifier',
          name: 'value',
        },
      }).forEach((node) => {
        if (node.property.type === 'Identifier') {
          node.property.name = 'modelValue';
          count++;
        }
      });

      // 3. this.$emit('input') --> this.$emit('modelValue')
      astHelpers.findAll(scriptAST, {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: { type: 'ThisExpression' },
          property: {
            type: 'Identifier',
            name: '$emit',
          },
        },
        arguments: [{
          type: 'Literal',
          value: 'input',
        }],
      }).forEach((node) => {
        if (node.arguments[0]?.type === 'Literal') {
          node.arguments[0].value = 'update:modelValue';
          count++;
        }
      });
    }

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          // 4. $emit('input') --> $emit('update:modelValue')
          if (node.type === 'CallExpression'
            && node.callee.type === 'Identifier'
            && node.callee.name === '$emit'
            && node.arguments[0]?.type === 'Literal'
            && node.arguments[0].value === 'input') {
            node.arguments[0].value = 'update:modelValue';
            count++;
          }

          // 5. v-bind:value --> v-bind:modelValue
          if (node.type === 'VAttribute'
            && node.directive
            && node.key.name.name === 'bind'
            && node.key.argument?.type === 'VIdentifier'
            && node.key.argument.name === 'value'
            && !elementsWithValue.includes(node.parent.parent.name)) {
            node.key.argument.rawName = 'modelValue';
            count++;
          }

          // 6. v-on:input --> v-on:update:modelValue
          if (node.type === 'VAttribute'
            && node.directive
            && node.key.name.name === 'on'
            && node.key.argument?.type === 'VIdentifier'
            && node.key.argument.name === 'input'
            && !elementsWithValue.includes(node.parent.parent.name)) {
            node.key.argument.rawName = 'update:modelValue';
            count++;
          }

          // 7. 'value' in template
          if (node.type === 'Identifier' && node.name === 'value') {
            if (node.parent?.type === 'MemberExpression'
              && node.parent.property === node) {
              return;
            }

            if (
              (node.parent?.type === 'FunctionExpression' || node.parent?.type === 'ArrowFunctionExpression')
              || isShadowedByFunction(node)) {
              return;
            }

            if (node.parent?.type === 'VForExpression' || isShadowedByVFor(node)) {
              return;
            }

            if (node.parent?.type === 'Property'
              && node.parent.key === node) {
              node.parent.shorthand = false;
              node.parent.value = scriptBuilders.identifier('value');
              count++;
              return;
            }

            count++;
            node.name = 'modelValue';
          }
        },
      });
    }

    return count;
  },
};
