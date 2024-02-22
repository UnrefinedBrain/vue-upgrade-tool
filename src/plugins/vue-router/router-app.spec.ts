import { expect, it } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { routerAppPlugin } from './router-app';

it('should report when router.app is used', () => {
  const input = `
<template>
  <div>{{ $router.app.$data.title }}</div>
</template>

<script>
import router from '@/router';

export default {
  created() {
    router.app.$data.title;
    this.$router.app.$data.title;
  },
};
</script>
`;

  expect(findManualMigrations(input, 'file.vue', [routerAppPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 21,
        "columnStart": 11,
        "file": "file.vue",
        "lineEnd": 3,
        "lineStart": 3,
        "message": "router.app was removed.
    See: https://router.vuejs.org/guide/migration/#Removal-of-router-app",
        "pluginName": "router.app",
        "snippet": "1 | 
    2 | <template>
    3 |   <div>{{ $router.app.$data.title }}</div>
      |           ^^^^^^^^^^^
    4 | </template>
    5 | 
    6 | <script>",
      },
      {
        "columnEnd": 14,
        "columnStart": 5,
        "file": "file.vue",
        "lineEnd": 11,
        "lineStart": 11,
        "message": "router.app was removed.
    See: https://router.vuejs.org/guide/migration/#Removal-of-router-app",
        "pluginName": "router.app",
        "snippet": " 8 | 
     9 | export default {
    10 |   created() {
    11 |     router.app.$data.title;
       |     ^^^^^^^^^^
    12 |     this.$router.app.$data.title;
    13 |   },
    14 | };",
      },
      {
        "columnEnd": 20,
        "columnStart": 5,
        "file": "file.vue",
        "lineEnd": 12,
        "lineStart": 12,
        "message": "router.app was removed.
    See: https://router.vuejs.org/guide/migration/#Removal-of-router-app",
        "pluginName": "router.app",
        "snippet": " 9 | export default {
    10 |   created() {
    11 |     router.app.$data.title;
    12 |     this.$router.app.$data.title;
       |     ^^^^^^^^^^^^^^^^
    13 |   },
    14 | };
    15 | </script>",
      },
    ]
  `);
});
