import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { dataFunctionPlugin } from './data-function';

it('should transform a data object', () => {
  const input = `
export default new Vue({
  data: {
    foo: 1,
    bar: 2,
  },
})
`;

  expect(transform(input, 'file.js', [dataFunctionPlugin]).code).toMatchInlineSnapshot(`
    "export default new Vue({
      data: () => ({
        foo: 1,
        bar: 2,
      }),
    })
    "
  `);
});
