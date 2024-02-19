import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { filtersPlugin } from './filters';

it('should report on filters', () => {
  const input = `
<template>
  <div>
    {{ name | upper }}
  </div>
</template>

<script>
export default {

}
</script>
`;

  expect(findManualMigrations(input, 'file.vue', [filtersPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 19,
        "columnStart": 8,
        "file": "file.vue",
        "lineEnd": 4,
        "lineStart": 4,
        "message": "Filters have been removed.
    See: https://v3-migration.vuejs.org/breaking-changes/filters.html#filters",
        "pluginName": "filters",
        "snippet": "1 | 
    2 | <template>
    3 |   <div>
    4 |     {{ name | upper }}
      |        ^^^^^^^^^^^^
    5 |   </div>
    6 | </template>
    7 | ",
      },
    ]
  `);
});
