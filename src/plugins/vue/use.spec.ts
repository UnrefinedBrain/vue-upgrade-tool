import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { vueUsePlugin } from './use';

it('should report on Vue.use() calls', () => {
  const input = `
Vue.use(SomePlugin);
`;

  expect(findManualMigrations(input, 'file.ts', [vueUsePlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 19,
        "columnStart": 1,
        "file": "file.ts",
        "lineEnd": 2,
        "lineStart": 2,
        "message": "Move Vue.use() to chain from createApp()",
        "pluginName": "vue-use",
        "snippet": "1 | 
    2 | Vue.use(SomePlugin);
      | ^^^^^^^^^^^^^^^^^^^
    3 | ",
      },
    ]
  `);
});
