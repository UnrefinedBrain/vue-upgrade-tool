import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { createLocalVuePlugin } from './createLocalVue';

it('should report on localVue / createLocalVue usage', () => {
  const input = `
const localVue = createLocalVue();
localVue.use(MyPlugin);
localVue.mixin(MyMixin);
`;

  expect(findManualMigrations(input, 'file.spec.js', [createLocalVuePlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 14,
        "columnStart": 7,
        "file": "file.spec.js",
        "lineEnd": 2,
        "lineStart": 2,
        "message": "localVue was removed
    See: https://test-utils.vuejs.org/migration/#No-more-createLocalVue",
        "pluginName": "test-utils-createLocalVue",
        "snippet": "1 | 
    2 | const localVue = createLocalVue();
      |       ^^^^^^^^
    3 | localVue.use(MyPlugin);
    4 | localVue.mixin(MyMixin);
    5 | ",
      },
      {
        "columnEnd": 8,
        "columnStart": 1,
        "file": "file.spec.js",
        "lineEnd": 3,
        "lineStart": 3,
        "message": "localVue was removed
    See: https://test-utils.vuejs.org/migration/#No-more-createLocalVue",
        "pluginName": "test-utils-createLocalVue",
        "snippet": "1 | 
    2 | const localVue = createLocalVue();
    3 | localVue.use(MyPlugin);
      | ^^^^^^^^
    4 | localVue.mixin(MyMixin);
    5 | ",
      },
      {
        "columnEnd": 8,
        "columnStart": 1,
        "file": "file.spec.js",
        "lineEnd": 4,
        "lineStart": 4,
        "message": "localVue was removed
    See: https://test-utils.vuejs.org/migration/#No-more-createLocalVue",
        "pluginName": "test-utils-createLocalVue",
        "snippet": "1 | 
    2 | const localVue = createLocalVue();
    3 | localVue.use(MyPlugin);
    4 | localVue.mixin(MyMixin);
      | ^^^^^^^^
    5 | ",
      },
      {
        "columnEnd": 33,
        "columnStart": 18,
        "file": "file.spec.js",
        "lineEnd": 2,
        "lineStart": 2,
        "message": "localVue was removed
    See: https://test-utils.vuejs.org/migration/#No-more-createLocalVue",
        "pluginName": "test-utils-createLocalVue",
        "snippet": "1 | 
    2 | const localVue = createLocalVue();
      |                  ^^^^^^^^^^^^^^^^
    3 | localVue.use(MyPlugin);
    4 | localVue.mixin(MyMixin);
    5 | ",
      },
    ]
  `);
});
