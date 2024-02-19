import { expect, it } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { ifForPrecedencePlugin } from './if-for-precedence';

it('should report when v-if and v-for are used together', () => {
  const input = `
<template>
  <div
    v-if="condition"
    v-for="i in 5"
  >
    {{ i }}
  </div>
</template>
`;

  expect(findManualMigrations(input, 'file.vue', [ifForPrecedencePlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 3,
        "columnStart": 3,
        "file": "file.vue",
        "lineEnd": 6,
        "lineStart": 3,
        "message": "v-if/v-for precedence has changed
    See: https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html",
        "pluginName": "if-for-precedence",
        "snippet": "1 | 
    2 | <template>
    3 |   <div
      |   ^^^^
    4 |     v-if="condition"
      | ^^^^^^^^^^^^^^^^^^^^
    5 |     v-for="i in 5"
      | ^^^^^^^^^^^^^^^^^^
    6 |   >
      | ^^^
    7 |     {{ i }}
    8 |   </div>
    9 | </template>",
      },
    ]
  `);
});
