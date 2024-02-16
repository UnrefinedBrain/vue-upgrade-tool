import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { vueDeletePlugin } from './vue-delete.js';

it('should replace Vue.delete and whatever.$delete', () => {
  const input = `
// with computed key
Vue.delete(target, key);

// with regular key
Vue.delete(target, 'key');

// with computed $delete
something.$delete(target, key);

// with regular $delete
something.$delete(target, 'key');
`;

  expect(transform(input, 'file.js', [vueDeletePlugin]).code).toMatchInlineSnapshot(`
    "// with computed key
    delete target[key];

    // with regular key
    delete target.key;

    // with computed $delete
    delete target[key];

    // with regular $delete
    delete target.key;
    "
  `);
});
