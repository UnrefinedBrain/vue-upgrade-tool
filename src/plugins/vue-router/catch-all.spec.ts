import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { catchAllPlugin } from './catch-all';

it('should report catch-all star routes', () => {
  const input = `
const routes = [
  { name: 'foo', path: '/foo' },
  { name: 'not-found', path: '*' }
]
`;

  expect(findManualMigrations(input, 'file.js', [catchAllPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 32,
        "columnStart": 24,
        "file": "file.js",
        "lineEnd": 4,
        "lineStart": 4,
        "message": "Catch-all routes must now be defined as '/:pathMatch(.*)*'
    See: https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes",
        "pluginName": "vue-router-catch-all",
        "snippet": "1 | 
    2 | const routes = [
    3 |   { name: 'foo', path: '/foo' },
    4 |   { name: 'not-found', path: '*' }
      |                        ^^^^^^^^^
    5 | ]
    6 | ",
      },
    ]
  `);
});
