import { transform } from 'vue-metamorph';
import { it, expect } from 'vitest';
import { contextualHPlugin } from './h';

it('should transform the h param in render functions', () => {
  const input = `
import Vue from 'vue';

const withFunctionExpression = {
  render(h) {
    return h('div');
  },
};

const withArrowFunctionExpression = {
  render: (h) => {
    return h('span');
  },
};

const withIrregularName = {
  render(createElement) {
    return createElement('div');
  },
};

const withIrregularNameArrow = {
  render: (createElement) => {
    return createElement('div');
  },
};
`;

  expect(transform(input, 'file.js', [contextualHPlugin]).code).toMatchInlineSnapshot(`
    "import Vue, { h } from 'vue';

    const withFunctionExpression = {
      render() {
        return h('div');
      },
    };

    const withArrowFunctionExpression = {
      render: () => {
        return h('span');
      },
    };

    const withIrregularName = {
      render() {
        return h('div');
      },
    };

    const withIrregularNameArrow = {
      render: () => {
        return h('div');
      },
    };
    "
  `);
});
