import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { getMatchedComponentsPlugin } from './getMatchedComponents';

it('should transform router.getMatchedComponents()', () => {
  const input = `
router.getMatchedComponents().forEach(c => {
  console.log(c);
});
`;

  expect(transform(input, 'file.js', [getMatchedComponentsPlugin]).code).toMatchInlineSnapshot(`
    "router.currentRoute.value.matched.flatMap((record) => Object.values(record.components)).forEach(c => {
      console.log(c);
    });
    "
  `);
});
