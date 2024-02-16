import { it, expect } from 'vitest';
import { transform, findManualMigrations } from 'vue-metamorph';
import { vueSetPlugin, vueSetManualPlugin } from './set';

it('should replace Vue.set and whatever.$set', () => {
  const input = `
// with computed key
Vue.set(target, key, value);

// with regular key
Vue.set(target, 'key', value);

// with computed $set
something.$set(target, key, value);

// with regular $set
something.$set(target, 'key', value);
`;

  expect(transform(input, 'file.js', [vueSetPlugin]).code).toMatchInlineSnapshot(`
    "// with computed key
    target[key] = value;

    // with regular key
    target.key = value;

    // with computed $set
    target[key] = value;

    // with regular $set
    target.key = value;
    "
  `);
});

it('should report when it cannot migrate', () => {
  const input = `
// with computed key
Vue.set(target, key);

// with regular key
Vue.set(target, 'key');

// with computed $set
something.$set(target, key);

// with regular $set
something.$set(target, 'key');
`;
  expect(findManualMigrations(input, 'file.js', [vueSetManualPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 20,
        "columnStart": 1,
        "file": "file.js",
        "lineEnd": 3,
        "lineStart": 3,
        "message": "Cannot automatically migrate this code - the call expression must have 3 arguments",
        "pluginName": "vue-set-manual",
        "snippet": "1 | 
    2 | // with computed key
    3 | Vue.set(target, key);
      | ^^^^^^^^^^^^^^^^^^^^
    4 | 
    5 | // with regular key
    6 | Vue.set(target, 'key');",
      },
      {
        "columnEnd": 22,
        "columnStart": 1,
        "file": "file.js",
        "lineEnd": 6,
        "lineStart": 6,
        "message": "Cannot automatically migrate this code - the call expression must have 3 arguments",
        "pluginName": "vue-set-manual",
        "snippet": "3 | Vue.set(target, key);
    4 | 
    5 | // with regular key
    6 | Vue.set(target, 'key');
      | ^^^^^^^^^^^^^^^^^^^^^^
    7 | 
    8 | // with computed $set
    9 | something.$set(target, key);",
      },
      {
        "columnEnd": 27,
        "columnStart": 1,
        "file": "file.js",
        "lineEnd": 9,
        "lineStart": 9,
        "message": "Cannot automatically migrate this code - the call expression must have 3 arguments",
        "pluginName": "vue-set-manual",
        "snippet": " 6 | Vue.set(target, 'key');
     7 | 
     8 | // with computed $set
     9 | something.$set(target, key);
       | ^^^^^^^^^^^^^^^^^^^^^^^^^^^
    10 | 
    11 | // with regular $set
    12 | something.$set(target, 'key');",
      },
      {
        "columnEnd": 29,
        "columnStart": 1,
        "file": "file.js",
        "lineEnd": 12,
        "lineStart": 12,
        "message": "Cannot automatically migrate this code - the call expression must have 3 arguments",
        "pluginName": "vue-set-manual",
        "snippet": " 9 | something.$set(target, key);
    10 | 
    11 | // with regular $set
    12 | something.$set(target, 'key');
       | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    13 | ",
      },
    ]
  `);
});
