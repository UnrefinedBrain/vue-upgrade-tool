import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { functionalComponentPlugin } from './functional-component';

it('should remove the functional component markers', () => {
  const input = `
<template functional hello>
  <div>foo</div>
</template>

<script>
export default {
  functional: true,
  name: 'Foo',
}
</script>
`;
  expect(transform(input, 'file.vue', [functionalComponentPlugin]).code).toMatchInlineSnapshot(`
    "
    <template hello>
      <div>foo</div>
    </template>

    <script>
    export default {
      name: 'Foo',
    };
    </script>
    "
  `);
});
