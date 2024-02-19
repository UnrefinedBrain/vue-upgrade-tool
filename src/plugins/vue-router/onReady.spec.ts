import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { onReadyPlugin } from './onReady';

it('should rewrite router.onReady with 1 argument', () => {
  const input = `
router.onReady(() => {
  console.log('router ready');
});
`;

  expect(transform(input, 'file.js', [onReadyPlugin]).code).toMatchInlineSnapshot(`
    "router.isReady().then(() => {
      console.log('router ready');
    });
    "
  `);
});

it('should rewrite router.onReady with 2 arguments', () => {
  const input = `
router.onReady(() => {
  console.log('router ready');
}, () => {
  console.log('router error');
});
`;

  expect(transform(input, 'file.js', [onReadyPlugin]).code).toMatchInlineSnapshot(`
    "router.isReady().then(() => {
      console.log('router ready');
    }).catch(() => {
      console.log('router error');
    });
    "
  `);
});
