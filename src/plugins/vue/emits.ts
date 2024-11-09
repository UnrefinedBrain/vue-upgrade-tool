import {
  builders, CodemodPlugin, namedTypes, traverseScriptAST,
} from 'vue-metamorph';

const findScriptEmits = (options: namedTypes.ObjectExpression) => {
  const emits = new Set<string>();
  traverseScriptAST(options, {
    visitCallExpression(path) {
      if (path.node.callee.type === 'MemberExpression'
        && path.node.callee.object.type === 'ThisExpression'
        && path.node.callee.property.type === 'Identifier'
        && path.node.callee.property.name === '$emit'
        && path.node.arguments[0]?.type === 'Literal'
        && typeof path.node.arguments[0].value === 'string') {
        emits.add(path.node.arguments[0].value);
      }
      return this.traverse(path);
    },
  });

  return Array.from(emits);
};

const addOrUpdateEmits = (options: namedTypes.ObjectExpression, emits: string[]) => {
  if (emits.length === 0) {
    return false;
  }

  let emitsProperty = options.properties.find((prop): prop is namedTypes.Property => prop.type === 'Property'
    && prop.key.type === 'Identifier'
    && prop.key.name === 'emits');

  const shouldAddEmits = !emitsProperty;

  let emitsArray: namedTypes.ArrayExpression;

  if (emitsProperty?.value.type === 'ArrayExpression') {
    emitsArray = emitsProperty.value;
  } else {
    emitsArray = builders.arrayExpression([]);
  }

  if (!emitsProperty) {
    emitsProperty = builders.property(
      'init',
      builders.identifier('emits'),
      emitsArray,
    );
  }

  if (shouldAddEmits) {
    options.properties.unshift(emitsProperty);
  }

  const existingEmits = emitsArray
    .elements
    .reduce<Record<string, true>>((prev, cur) => {
    if (cur?.type === 'Literal'
      && typeof cur.value === 'string'
    ) {
      prev[cur.value] = true;
    }
    return prev;
  }, {});

  let modified = false;
  for (const emit of emits) {
    if (!existingEmits[emit]) {
      emitsArray.elements.push(
        builders.literal(emit),
      );
      modified = true;
    }
  }

  return modified;
};

export const emitsNonSfcPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-emits-non-sfc',
  transform({
    filename,
    scriptASTs,
    utils: { astHelpers },
  }) {
    if (filename.endsWith('.vue')) {
      return 0;
    }

    let transformCount = 0;

    for (const scriptAST of scriptASTs) {
      for (const obj of astHelpers.findVueComponentOptions(scriptAST, false)) {
        const emits = findScriptEmits(obj);
        if (addOrUpdateEmits(obj, emits)) {
          transformCount++;
        }
      }
    }

    return transformCount;
  },
};

export const emitsSfcPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-emits-sfc',
  transform({
    scriptASTs, sfcAST, filename, utils: { astHelpers },
  }) {
    if (!filename.endsWith('.vue')) {
      return 0;
    }

    let transformCount = 0;

    const emits = new Set<string>();

    if (sfcAST) {
      // find $emit() calls in template
      astHelpers
        .findAll(sfcAST, {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: '$emit',
          },
        })
        .forEach((node) => {
          if (node.arguments[0]?.type === 'Literal'
            && typeof node.arguments[0].value === 'string') {
            emits.add(node.arguments[0].value);
          }
        });
    }

    for (const scriptAST of scriptASTs) {
      const options = astHelpers.findVueComponentOptions(scriptAST, true);

      options
        .flatMap((obj) => findScriptEmits(obj))
        .forEach((event) => emits.add(event));

      options.forEach((obj) => {
        if (addOrUpdateEmits(obj, Array.from(emits))) {
          transformCount++;
        }
      });
    }

    return transformCount;
  },
};
