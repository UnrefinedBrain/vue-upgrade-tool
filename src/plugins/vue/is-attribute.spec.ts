import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { isAttributePlugin } from './is-attribute';

it('should report on "is" attribute usage on non-component tags', () => {
  const input = `
<template>
  <div>
    <RouterLink is="a" />
    <RouterLink :is="'a'" />

    <component is="span"> hello </component>
    <component :is="'span'"> hi </component>
  </div>
</template>
`;

  expect(findManualMigrations(input, 'file.vue', [isAttributePlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 22,
        "columnStart": 17,
        "file": "file.vue",
        "lineEnd": 4,
        "lineStart": 4,
        "message": "The 'is' attribute can only be used on a <component> tag
    See: https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html#customized-built-in-elements",
        "pluginName": "is-attribute",
        "snippet": "1 | 
    2 | <template>
    3 |   <div>
    4 |     <RouterLink is="a" />
      |                 ^^^^^^
    5 |     <RouterLink :is="'a'" />
    6 | 
    7 |     <component is="span"> hello </component>",
      },
      {
        "columnEnd": 25,
        "columnStart": 17,
        "file": "file.vue",
        "lineEnd": 5,
        "lineStart": 5,
        "message": "The 'is' attribute can only be used on a <component> tag
    See: https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html#customized-built-in-elements",
        "pluginName": "is-attribute",
        "snippet": "2 | <template>
    3 |   <div>
    4 |     <RouterLink is="a" />
    5 |     <RouterLink :is="'a'" />
      |                 ^^^^^^^^^
    6 | 
    7 |     <component is="span"> hello </component>
    8 |     <component :is="'span'"> hi </component>",
      },
    ]
  `);
});
