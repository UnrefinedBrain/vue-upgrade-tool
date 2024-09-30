import { expect, it } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { propsDefaultThisPlugin } from './props-default-this';

it('should report when a prop default function uses this', () => {
  const input = `
<script>
export default {
  props: {
    foo: {
      default() {
        return this.bar;
      },
      type: String,
    },

    bar: String,
  }
}
</script>
`;

  expect(findManualMigrations(input, 'file.vue', [propsDefaultThisPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 23,
        "columnStart": 16,
        "file": "file.vue",
        "lineEnd": 7,
        "lineStart": 7,
        "message": "Props default functions can no longer access \`this\`
    See: https://v3-migration.vuejs.org/breaking-changes/props-default-this.html",
        "pluginName": "vue-props-default-this",
        "snippet": " 4 |   props: {
     5 |     foo: {
     6 |       default() {
     7 |         return this.bar;
       |                ^^^^^^^^
     8 |       },
     9 |       type: String,
    10 |     },",
      },
    ]
  `);
});
