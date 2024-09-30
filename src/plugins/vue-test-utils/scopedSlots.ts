import { CodemodPlugin } from 'vue-metamorph';
import { findMounts, isTestFile } from './utils';

export const scopedSlotsMountPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'test-utils-scoped-slots-mount-option',
  transform({ scriptASTs, filename, utils: { builders } }) {
    if (!isTestFile(filename)) {
      return 0;
    }

    let count = 0;

    for (const scriptAST of scriptASTs) {
      findMounts(scriptAST).forEach((mountOptions) => {
        let slots = mountOptions.properties.find((prop) => prop.type === 'Property'
          && prop.key.type === 'Identifier'
          && prop.key.name === 'slots');

        const scopedSlots = mountOptions.properties.find((prop) => prop.type === 'Property'
          && prop.key.type === 'Identifier'
          && prop.key.name === 'scopedSlots');

        if (!scopedSlots || scopedSlots.type !== 'Property') {
          return;
        }

        count++;
        let pushSlotsProperty = false;

        if (!slots) {
          pushSlotsProperty = true;

          slots = builders.property(
            'init',
            builders.identifier('slots'),
            builders.objectExpression([
              ...scopedSlots.value.type === 'ObjectExpression'
                ? scopedSlots.value.properties
                : [builders.spreadElement(scopedSlots.value as never)],
            ]),
          );
        } else if (slots.type === 'Property') {
          slots.shorthand = false;
          if (slots.value.type === 'ObjectExpression') {
            slots.value.properties.push(
              ...scopedSlots.value.type === 'ObjectExpression'
                ? scopedSlots.value.properties
                : [builders.spreadElement(scopedSlots.value as never)],
            );
          } else {
            slots.value = builders.objectExpression([
              builders.spreadElement(slots.value as never),
              ...scopedSlots.value.type === 'ObjectExpression'
                ? scopedSlots.value.properties
                : [builders.spreadElement(scopedSlots.value as never)],
            ]);
          }
        }

        if (pushSlotsProperty) {
          mountOptions.properties.push(slots!);
        }

        mountOptions.properties = mountOptions.properties.filter((prop) => prop.type !== 'Property' || prop.key.type !== 'Identifier' || prop.key.name !== 'scopedSlots');
      });
    }

    return count;
  },
};
