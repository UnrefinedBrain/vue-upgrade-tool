import {
  CodemodPlugin, namedTypes, builders, traverseScriptAST,
} from 'vue-metamorph';

const getKeyName = (node: namedTypes.Property['key']) => {
  if (node.type === 'Identifier') {
    return node.name;
  }

  if (node.type === 'Literal'
    && typeof node.value === 'string'
  ) {
    return node.value;
  }

  return null;
};

const hasArrayReturnTypeAnnotation = (t: namedTypes.FunctionExpression['returnType']) => {
  if (!t) {
    return false;
  }

  if (t.type !== 'TSTypeAnnotation') {
    return false;
  }

  if (t.typeAnnotation.type === 'TSArrayType') {
    return true;
  }

  if (t.typeAnnotation.type === 'TSTypeReference'
      && t.typeAnnotation.typeName.type === 'Identifier'
      && t.typeAnnotation.typeName.name === 'Array'
  ) {
    return true;
  }

  if (t.typeAnnotation.type === 'TSUnionType') {
    for (const constituent of t.typeAnnotation.types) {
      if (constituent.type === 'TSArrayType') {
        return true;
      }

      if (constituent.type === 'TSTypeReference'
          && constituent.typeName.type === 'Identifier'
          && constituent.typeName.name === 'Array'
      ) {
        return true;
      }
    }
  }

  return false;
};

const findBlock = (obj: namedTypes.ObjectExpression, name: string) => {
  for (const prop of obj.properties) {
    if (prop.type !== 'Property') {
      continue;
    }

    if (prop.key.type === 'Literal'
        && prop.key.value === name) {
      return prop.value;
    }

    if (!prop.computed
      && prop.key.type === 'Identifier'
      && prop.key.name === name) {
      return prop.value;
    }
  }

  return null;
};

const findArrayProps = (props: namedTypes.ObjectExpression) => {
  const arrayProps: string[] = [];

  for (const property of props.properties) {
    if (property.type !== 'Property') {
      continue;
    }

    if (property.value.type === 'Identifier'
      && property.value.name === 'Array'
    ) {
      const name = getKeyName(property.key);
      if (name) {
        arrayProps.push(name);
      }
    }

    if (property.value.type === 'ObjectExpression') {
      for (const prop of property.value.properties) {
        if (prop.type !== 'Property') {
          continue;
        }

        if (prop.key.type === 'Identifier'
          && prop.key.name === 'type'
          && prop.value.type === 'Identifier'
          && prop.value.name === 'Array'
        ) {
          const name = getKeyName(property.key);
          if (name) {
            arrayProps.push(name);
          }
        }
      }
    }
  }

  return arrayProps;
};

const findArrayData = (data: namedTypes.FunctionExpression | namedTypes.ArrowFunctionExpression) => {
  const arrayData: string[] = [];

  if (data.body.type === 'ObjectExpression') {
    for (const prop of data.body.properties) {
      if (prop.type !== 'Property') {
        continue;
      }

      if (prop.value.type === 'ArrayExpression') {
        const name = getKeyName(prop.key);
        if (name) {
          arrayData.push(name);
        }
      }
    }
  }

  if (data.body.type === 'BlockStatement') {
    traverseScriptAST(data.body, {
      visitFunctionExpression() {
        return false;
      },
      visitArrowFunctionExpression() {
        return false;
      },
      visitReturnStatement(path) {
        if (path.node.argument?.type === 'ObjectExpression') {
          for (const prop of path.node.argument.properties) {
            if (prop.type !== 'Property') {
              continue;
            }

            if (prop.value.type === 'ArrayExpression') {
              const name = getKeyName(prop.key);
              if (name) {
                arrayData.push(name);
              }
            }
          }
        }

        return this.traverse(path);
      },
    });
  }

  return arrayData;
};

const findArrayComputed = (computed: namedTypes.ObjectExpression) => {
  const arrayComputed: string[] = [];

  for (const prop of computed.properties) {
    if (prop.type !== 'Property') {
      continue;
    }

    const name = getKeyName(prop.key);

    if (name && prop.value.type === 'FunctionExpression') {
      // look at TS annotation
      if (hasArrayReturnTypeAnnotation(prop.value.returnType)) {
        arrayComputed.push(name);
        continue;
      }

      traverseScriptAST(prop.value.body, {
        visitFunctionExpression() {
          return false;
        },
        visitArrowFunctionExpression() {
          return false;
        },
        visitReturnStatement(path) {
          if (path.node.argument?.type === 'ArrayExpression') {
            arrayComputed.push(name);
          }
          this.traverse(path);
        },
      });
    }
  }

  return arrayComputed;
};

const makeDeepWatcher = (property: namedTypes.Property) => {
  // 1. set `deep` to true if watcher value is already an object
  if (property.value.type === 'ObjectExpression') {
    // 1a. if `deep` exists, set it to `true`
    for (const prop of property.value.properties) {
      if (prop.type === 'Property'
        && prop.key.type === 'Identifier'
        && prop.key.name === 'deep'
      ) {
        prop.value = builders.literal(true);
        return;
      }
    }

    // 1b. if `deep` doesn't exist, add it
    property.value.properties.push(
      builders.property(
        'init',
        builders.identifier('deep'),
        builders.literal(true),
      ),
    );

    return;
  }

  // 2. if handler is not an object, wrap it
  const watcher = property.value;
  property.shorthand = false;

  property.value = builders.objectExpression([
    builders.property(
      'init',
      builders.identifier('deep'),
      builders.literal(true),
    ),

    (() => {
      const prop = builders.property(
        'init',
        builders.identifier('handler'),
        watcher,
      );

      prop.method = property.method;

      return prop;
    })(),
  ]);

  property.method = false;
};

export const arrayWatchPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'array-watch',
  transform({ scriptASTs, utils: { astHelpers }, filename }) {
    let count = 0;
    for (const scriptAST of scriptASTs) {
      count++;
      const optionsBlocks = astHelpers.findVueComponentOptions(scriptAST, filename.endsWith('.vue'));
      for (const block of optionsBlocks) {
        const props = findBlock(block, 'props');
        const computed = findBlock(block, 'computed');
        const watch = findBlock(block, 'watch');
        const data = findBlock(block, 'data');

        const arrayNames: string[] = [];

        if (!watch || watch.type !== 'ObjectExpression') {
          // no watchers, nothing to do
          continue;
        }

        if (props && props.type === 'ObjectExpression') {
          arrayNames.push(...findArrayProps(props));
        }

        if (computed && computed.type === 'ObjectExpression') {
          arrayNames.push(...findArrayComputed(computed));
        }

        if (data && (data.type === 'FunctionExpression' || data.type === 'ArrowFunctionExpression')) {
          arrayNames.push(...findArrayData(data));
        }

        const isArrayName = arrayNames.reduce((acc, cur) => {
          acc[cur] = true;
          return acc;
        }, {} as Record<string, true>);

        for (const prop of watch.properties) {
          if (prop.type !== 'Property') {
            continue;
          }

          const name = getKeyName(prop.key);
          if (name && isArrayName[name]) {
            makeDeepWatcher(prop);
            count++;
          }

          if (name) {
            const [part1] = name.split('.');
            if (part1 && isArrayName[part1]) {
              makeDeepWatcher(prop);
              count++;
            }
          }
        }
      }
    }

    return count;
  },
};
