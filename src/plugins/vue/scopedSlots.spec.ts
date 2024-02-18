import { expect, it } from 'vitest';
import { transform } from 'vue-metamorph';
import { scopedSlotsPlugin } from './scopedSlots';

it('should replace $scopedSlots with $slots', () => {
  const input = `
<template>
  <div v-if="$scopedSlots.something">
  </div>
</template>

<script>
export default {
  mounted() {
    if (this.$scopedSlots.something) {
      console.log('foo');
    }
  },
};
</script>
`;

  expect(transform(input, 'file.vue', [scopedSlotsPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div v-if="$slots.something">
      </div>
    </template>

    <script>
    export default {
      mounted() {
        if (this.$slots.something) {
          console.log('foo');
        }
      },
    };
    </script>
    "
  `);
});
