import { it, expect } from 'vitest';
import { findManualMigrations, transform } from 'vue-metamorph';
import { removeListenersCodemodPlugin, removeListenersManualMigrationPlugin } from './listeners';

it('should remove v-on="$listeners"', () => {
  const input = `
<template>
  <div v-bind="$attrs" v-on="$listeners">Has close listener: {{ !!$listeners.close }}</div>
</template>

<script>
export default {
  computed: {
    hasCloseListener() {
      return !!this.$listeners.close;
    }
  }
}
</script>
`;

  expect(transform(input, 'file.vue', [removeListenersCodemodPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div v-bind="$attrs">Has close listener: {{ !!$listeners.close }}</div>
    </template>

    <script>
    export default {
      computed: {
        hasCloseListener() {
          return !!this.$listeners.close;
        }
      }
    }
    </script>
    "
  `);
});

it('should report on remaining $listeners usages', () => {
  const input = `
<template>
  <div>Has close listener: {{ !!$listeners.close }}</div>
</template>

<script>
export default {
  computed: {
    hasCloseListener() {
      return !!this.$listeners.close;
    }
  }
}
</script>
`;

  expect(findManualMigrations(input, 'file.vue', [removeListenersManualMigrationPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 30,
        "columnStart": 21,
        "file": "file.vue",
        "lineEnd": 10,
        "lineStart": 10,
        "message": "$listeners has been removed.
    See: https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html#listeners-removed",
        "pluginName": "vue-remove-$listeners-manual",
        "snippet": " 7 | export default {
     8 |   computed: {
     9 |     hasCloseListener() {
    10 |       return !!this.$listeners.close;
       |                     ^^^^^^^^^^
    11 |     }
    12 |   }
    13 | }",
      },
      {
        "columnEnd": 42,
        "columnStart": 33,
        "file": "file.vue",
        "lineEnd": 3,
        "lineStart": 3,
        "message": "$listeners has been removed.
    See: https://v3-migration.vuejs.org/breaking-changes/listeners-removed.html#listeners-removed",
        "pluginName": "vue-remove-$listeners-manual",
        "snippet": "1 | 
    2 | <template>
    3 |   <div>Has close listener: {{ !!$listeners.close }}</div>
      |                                 ^^^^^^^^^^
    4 | </template>
    5 | 
    6 | <script>",
      },
    ]
  `);
});
