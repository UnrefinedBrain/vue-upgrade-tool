import { transform } from 'vue-metamorph';
import { it, expect } from 'vitest';
import { vueRouterInstantiationPlugin } from './instantiation.js';

it('should update instantiation style', () => {
  const input = `
import VueRouter from 'vue-router';

const router = new VueRouter({
  someProperty,
});
`;
  expect(transform(input, 'file.js', [vueRouterInstantiationPlugin]).code).toMatchInlineSnapshot(`
    "import * as VueRouter from 'vue-router';

    const router = VueRouter.createRouter({
      someProperty,
    });
    "
  `);
});
