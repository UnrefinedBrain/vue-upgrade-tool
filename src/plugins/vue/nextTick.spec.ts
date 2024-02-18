import { expect, it } from 'vitest';
import { transform } from 'vue-metamorph';
import { nextTickPlugin } from './nextTick';

it('should replace Vue.nextTick', () => {
  const input = `
import Vue from 'vue';
const a = () => {
  Vue.nextTick().then(() => {
    console.log('hello');
  });
}
`;

  expect(transform(input, 'file.js', [nextTickPlugin]).code).toMatchInlineSnapshot(`
    "import Vue, { nextTick } from 'vue';
    const a = () => {
      nextTick().then(() => {
        console.log('hello');
      });
    }
    "
  `);
});

it('should replace something.$nextTick', () => {
  const input = `
<script>
export default {
  methods: {
    async foo() {
      await this.$nextTick();
    }
  }
}
</script>
`;

  expect(transform(input, 'file.vue', [nextTickPlugin]).code).toMatchInlineSnapshot(`
    "
    <script>
    import { nextTick } from 'vue';

    export default {
      methods: {
        async foo() {
          await nextTick();
        }
      }
    }
    </script>
    "
  `);
});
