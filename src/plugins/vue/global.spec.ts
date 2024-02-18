import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { vueGlobalPlugin } from './global';

it('should report on Vue global API calls', () => {
  const input = `
Vue.use(SomePlugin);
Vue.directive({});
Vue.component({});
Vue.mixin({});
Vue.config.whatever

Vue.prototype.something = () => {
  // hello
}
`;

  expect(findManualMigrations(input, 'file.ts', [vueGlobalPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 19,
        "columnStart": 1,
        "file": "file.ts",
        "lineEnd": 2,
        "lineStart": 2,
        "message": "Move Vue.use() to chain from createApp()
    See: https://v3-migration.vuejs.org/breaking-changes/global-api.html#global-api-application-instance",
        "pluginName": "vue-use",
        "snippet": "1 | 
    2 | Vue.use(SomePlugin);
      | ^^^^^^^^^^^^^^^^^^^
    3 | Vue.directive({});
    4 | Vue.component({});
    5 | Vue.mixin({});",
      },
      {
        "columnEnd": 17,
        "columnStart": 1,
        "file": "file.ts",
        "lineEnd": 3,
        "lineStart": 3,
        "message": "Move Vue.directive() to chain from createApp()
    See: https://v3-migration.vuejs.org/breaking-changes/global-api.html#global-api-application-instance",
        "pluginName": "vue-use",
        "snippet": "1 | 
    2 | Vue.use(SomePlugin);
    3 | Vue.directive({});
      | ^^^^^^^^^^^^^^^^^
    4 | Vue.component({});
    5 | Vue.mixin({});
    6 | Vue.config.whatever",
      },
      {
        "columnEnd": 17,
        "columnStart": 1,
        "file": "file.ts",
        "lineEnd": 4,
        "lineStart": 4,
        "message": "Move Vue.component() to chain from createApp()
    See: https://v3-migration.vuejs.org/breaking-changes/global-api.html#global-api-application-instance",
        "pluginName": "vue-use",
        "snippet": "1 | 
    2 | Vue.use(SomePlugin);
    3 | Vue.directive({});
    4 | Vue.component({});
      | ^^^^^^^^^^^^^^^^^
    5 | Vue.mixin({});
    6 | Vue.config.whatever
    7 | ",
      },
      {
        "columnEnd": 13,
        "columnStart": 1,
        "file": "file.ts",
        "lineEnd": 5,
        "lineStart": 5,
        "message": "Move Vue.mixin() to chain from createApp()
    See: https://v3-migration.vuejs.org/breaking-changes/global-api.html#global-api-application-instance",
        "pluginName": "vue-use",
        "snippet": "2 | Vue.use(SomePlugin);
    3 | Vue.directive({});
    4 | Vue.component({});
    5 | Vue.mixin({});
      | ^^^^^^^^^^^^^
    6 | Vue.config.whatever
    7 | 
    8 | Vue.prototype.something = () => {",
      },
      {
        "columnEnd": 13,
        "columnStart": 1,
        "file": "file.ts",
        "lineEnd": 8,
        "lineStart": 8,
        "message": "Move Vue.prototype assignment to createApp().config.globalProperties",
        "pluginName": "vue-use",
        "snippet": " 5 | Vue.mixin({});
     6 | Vue.config.whatever
     7 | 
     8 | Vue.prototype.something = () => {
       | ^^^^^^^^^^^^^
     9 |   // hello
    10 | }
    11 | ",
      },
    ]
  `);
});
