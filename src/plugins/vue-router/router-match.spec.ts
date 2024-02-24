import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { routerMatchPlugin } from './router-match';

it('should report on router.match()', () => {
  const input = `
router.match();
`;

  expect(findManualMigrations(input, 'file.js', [routerMatchPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 14,
        "columnStart": 1,
        "file": "file.js",
        "lineEnd": 2,
        "lineStart": 2,
        "message": "router.match() was removed
    See: https://router.vuejs.org/guide/migration/#Removal-of-router-match-and-changes-to-router-resolve",
        "pluginName": "router-match",
        "snippet": "1 | 
    2 | router.match();
      | ^^^^^^^^^^^^^^
    3 | ",
      },
    ]
  `);
});
