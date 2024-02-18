import { expect, it } from 'vitest';
import { transform } from 'vue-metamorph';
import { vuexInstantiationPlugin } from './instantiation';

it('should upgrade vuex store instantiation', () => {
  const input = `
import Vuex from 'vuex';

const store = new Vuex.Store({
  state: {
    foo: 1
  },
});
`;

  expect(transform(input, 'file.js', [vuexInstantiationPlugin]).code).toMatchInlineSnapshot(`
    "import Vuex, { createStore } from 'vuex';

    const store = createStore({
      state: {
        foo: 1
      },
    });
    "
  `);
});
