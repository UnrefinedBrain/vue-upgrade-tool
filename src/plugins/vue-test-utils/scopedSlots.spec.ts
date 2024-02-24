import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { scopedSlotsMountPlugin } from './scopedSlots';

it('should fold scopedSlots mount option into slots', () => {
  const input = `
mount(MyComponent, {
  slots,
  scopedSlots,
});

mount(MyComponent, {
  slots,
  scopedSlots: {
    foo,
  },
});

mount(MyComponent, {
  slots: {
    foo,
  },
  scopedSlots,
});

mount(MyComponent, {
  slots: {
    foo,
  },
  scopedSlots: {
    bar,
  },
});
`;

  expect(transform(input, 'file.spec.js', [scopedSlotsMountPlugin]).code).toMatchInlineSnapshot(`
    "mount(MyComponent, {
      slots: {
        ...slots,
        ...scopedSlots,
      },
    });

    mount(MyComponent, {
      slots: {
        ...slots,
        foo,
      },
    });

    mount(MyComponent, {
      slots: {
        foo,
        ...scopedSlots,
      },
    });

    mount(MyComponent, {
      slots: {
        foo,
        bar,
      },
    });
    "
  `);
});
