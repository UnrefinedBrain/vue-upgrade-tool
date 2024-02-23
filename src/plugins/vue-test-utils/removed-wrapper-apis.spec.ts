import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { removedWrapperApisPlugin } from './removed-wrapper-apis';

it('should report on removed wrapper APIs', () => {
  const input = `
wrapper.contains('div');
wrapper.emittedByOrder();
wrapper.setSelected(true);
wrapper.setChecked(true);
wrapper.is('div');
wrapper.isEmpty();
wrapper.isVueInstance();
wrapper.name;
wrapper.setMethods({});
`;

  expect(findManualMigrations(input, 'file.spec.ts', [removedWrapperApisPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 23,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 2,
        "lineStart": 2,
        "message": "wrapper.contains was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": "1 | 
    2 | wrapper.contains('div');
      | ^^^^^^^^^^^^^^^^^^^^^^^
    3 | wrapper.emittedByOrder();
    4 | wrapper.setSelected(true);
    5 | wrapper.setChecked(true);",
      },
      {
        "columnEnd": 24,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 3,
        "lineStart": 3,
        "message": "wrapper.emittedByOrder was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": "1 | 
    2 | wrapper.contains('div');
    3 | wrapper.emittedByOrder();
      | ^^^^^^^^^^^^^^^^^^^^^^^^
    4 | wrapper.setSelected(true);
    5 | wrapper.setChecked(true);
    6 | wrapper.is('div');",
      },
      {
        "columnEnd": 25,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 4,
        "lineStart": 4,
        "message": "wrapper.setSelected was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": "1 | 
    2 | wrapper.contains('div');
    3 | wrapper.emittedByOrder();
    4 | wrapper.setSelected(true);
      | ^^^^^^^^^^^^^^^^^^^^^^^^^
    5 | wrapper.setChecked(true);
    6 | wrapper.is('div');
    7 | wrapper.isEmpty();",
      },
      {
        "columnEnd": 24,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 5,
        "lineStart": 5,
        "message": "wrapper.setChecked was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": "2 | wrapper.contains('div');
    3 | wrapper.emittedByOrder();
    4 | wrapper.setSelected(true);
    5 | wrapper.setChecked(true);
      | ^^^^^^^^^^^^^^^^^^^^^^^^
    6 | wrapper.is('div');
    7 | wrapper.isEmpty();
    8 | wrapper.isVueInstance();",
      },
      {
        "columnEnd": 17,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 6,
        "lineStart": 6,
        "message": "wrapper.is was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": "3 | wrapper.emittedByOrder();
    4 | wrapper.setSelected(true);
    5 | wrapper.setChecked(true);
    6 | wrapper.is('div');
      | ^^^^^^^^^^^^^^^^^
    7 | wrapper.isEmpty();
    8 | wrapper.isVueInstance();
    9 | wrapper.name;",
      },
      {
        "columnEnd": 17,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 7,
        "lineStart": 7,
        "message": "wrapper.isEmpty was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": " 4 | wrapper.setSelected(true);
     5 | wrapper.setChecked(true);
     6 | wrapper.is('div');
     7 | wrapper.isEmpty();
       | ^^^^^^^^^^^^^^^^^
     8 | wrapper.isVueInstance();
     9 | wrapper.name;
    10 | wrapper.setMethods({});",
      },
      {
        "columnEnd": 23,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 8,
        "lineStart": 8,
        "message": "wrapper.isVueInstance was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": " 5 | wrapper.setChecked(true);
     6 | wrapper.is('div');
     7 | wrapper.isEmpty();
     8 | wrapper.isVueInstance();
       | ^^^^^^^^^^^^^^^^^^^^^^^
     9 | wrapper.name;
    10 | wrapper.setMethods({});
    11 | ",
      },
      {
        "columnEnd": 12,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 9,
        "lineStart": 9,
        "message": "wrapper.name was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": " 6 | wrapper.is('div');
     7 | wrapper.isEmpty();
     8 | wrapper.isVueInstance();
     9 | wrapper.name;
       | ^^^^^^^^^^^^
    10 | wrapper.setMethods({});
    11 | ",
      },
      {
        "columnEnd": 22,
        "columnStart": 1,
        "file": "file.spec.ts",
        "lineEnd": 10,
        "lineStart": 10,
        "message": "wrapper.setMethods was removed.
    See: https://test-utils.vuejs.org/migration/#Wrapper-API-mount-",
        "pluginName": "removed-wrapper-apis",
        "snippet": " 7 | wrapper.isEmpty();
     8 | wrapper.isVueInstance();
     9 | wrapper.name;
    10 | wrapper.setMethods({});
       | ^^^^^^^^^^^^^^^^^^^^^^
    11 | ",
      },
    ]
  `);
});
