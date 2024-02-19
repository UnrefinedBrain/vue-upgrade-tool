import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { dataFunctionPlugin } from './data-function';

it('should transform a data object', () => {
  const input = `
<script>
export default {
  data: {
    foo: 1,
    bar: 2,
  },
}
</script>
`;

  expect(transform(input, 'file.vue', [dataFunctionPlugin]).code).toMatchInlineSnapshot(`
    "
    <script>
    export default {
      data: () => ({
        foo: 1,
        bar: 2,
      }),
    }
    </script>
    "
  `);
});
