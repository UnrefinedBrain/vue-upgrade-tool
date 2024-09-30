import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { childrenPlugin } from './children';

it('should report on $children usage', () => {
  const input = `
<template>
  <div>
    {{ !!$children[0] }}
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.$children[0]);
  },
}
</script>
`;

  expect(findManualMigrations(input, 'file.vue', [childrenPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 30,
        "columnStart": 22,
        "file": "file.vue",
        "lineEnd": 11,
        "lineStart": 11,
        "message": "$children has been removed.
    See: https://v3-migration.vuejs.org/breaking-changes/children.html#children",
        "pluginName": "vue-$children",
        "snippet": " 8 | <script>
     9 | export default {
    10 |   created() {
    11 |     console.log(this.$children[0]);
       |                      ^^^^^^^^^
    12 |   },
    13 | }
    14 | </script>",
      },
      {
        "columnEnd": 18,
        "columnStart": 10,
        "file": "file.vue",
        "lineEnd": 4,
        "lineStart": 4,
        "message": "$children has been removed.
    See: https://v3-migration.vuejs.org/breaking-changes/children.html#children",
        "pluginName": "vue-$children",
        "snippet": "1 | 
    2 | <template>
    3 |   <div>
    4 |     {{ !!$children[0] }}
      |          ^^^^^^^^^
    5 |   </div>
    6 | </template>
    7 | ",
      },
    ]
  `);
});
