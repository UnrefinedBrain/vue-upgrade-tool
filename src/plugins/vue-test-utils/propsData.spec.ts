import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { propsDataTestPlugin } from './propsData';

it('should rename propsData to props', () => {
  const input = `
mount(MyComponent, {
  propsData: {
    a: 1,
    b: 2,
    c: 3,
  }
});

shallowMount(MyComponent, {
  propsData,
});
  `;

  expect(transform(input, 'file.spec.js', [propsDataTestPlugin]).code).toMatchInlineSnapshot(`
    "mount(MyComponent, {
      props: {
        a: 1,
        b: 2,
        c: 3,
      }
    });

    shallowMount(MyComponent, {
      props: propsData,
    });
    "
  `);
});
