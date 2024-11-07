import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { arrayWatchPlugin } from './array-watch';

it('should make array prop watchers deep', () => {
  const code = `
export default defineComponent({
  props: {
    foo: Array,
    bar: {
      type: Array,
      default: () => []
    }
  },

  watch: {
    foo() {
      console.log('foo watcher');
    },

    bar() {
      console.log('bar watcher');
    },

    baz() {
      console.log('baz watcher');
    },
  }
});
`;

  expect(transform(code, 'file.ts', [arrayWatchPlugin]).code).toMatchInlineSnapshot(`
    "export default defineComponent({
      props: {
        foo: Array,
        bar: {
          type: Array,
          default: () => []
        }
      },

      watch: {
        foo: {
          deep: true,

          handler() {
            console.log('foo watcher');
          },
        },

        bar: {
          deep: true,

          handler() {
            console.log('bar watcher');
          },
        },

        baz() {
          console.log('baz watcher');
        },
      }
    });
    "
  `);
});

it('should make array data watchers deep', () => {
  const code = `
const a = defineComponent({
  data: () => ({
    foo: [],
  }),

  watch: {
    foo() {
      console.log('foo watcher');
    },
  },
});

const b = defineComponent({
  data() {
    return {
      foo: [],
    };
  },

  watch: {
    foo() {
      console.log('foo watcher');
    },
  },
})
`;

  expect(transform(code, 'file.ts', [arrayWatchPlugin]).code).toMatchInlineSnapshot(`
    "const a = defineComponent({
      data: () => ({
        foo: [],
      }),

      watch: {
        foo: {
          deep: true,

          handler() {
            console.log('foo watcher');
          },
        },
      },
    });

    const b = defineComponent({
      data() {
        return {
          foo: [],
        };
      },

      watch: {
        foo: {
          deep: true,

          handler() {
            console.log('foo watcher');
          },
        },
      },
    })
    "
  `);
});

it('should make array computed watchers deep', () => {
  const code = `
const a = defineComponent({
  computed: {
    // based on type annotation
    foo(): number[] {
      return Array.from({ length: 5 }).map((_, i) => i);
    },

    // based on type annotation
    bar(): Array<number> {
      return Array.from({ length: 5 }).map((_, i) => i);
    },

    // based on returning an array
    baz() {
      return [];
    },

    qux() {
      return 'hello';
    },
  },

  watch: {
    foo: {
      immediate: true,
      handler() {
        console.log('foo watcher');
      },
    },
    
    bar() {
      console.log('bar watcher');
    },
    baz() {
      console.log('baz watcher');
    },
    qux() {
      console.log('qux watcher');
    },
  },
});
  `;

  expect(transform(code, 'file.ts', [arrayWatchPlugin]).code).toMatchInlineSnapshot(`
    "const a = defineComponent({
      computed: {
        // based on type annotation
        foo(): number[] {
          return Array.from({ length: 5 }).map((_, i) => i);
        },

        // based on type annotation
        bar(): Array<number> {
          return Array.from({ length: 5 }).map((_, i) => i);
        },

        // based on returning an array
        baz() {
          return [];
        },

        qux() {
          return 'hello';
        },
      },

      watch: {
        foo: {
          immediate: true,

          handler() {
            console.log('foo watcher');
          },

          deep: true,
        },
        
        bar: {
          deep: true,

          handler() {
            console.log('bar watcher');
          },
        },
        baz: {
          deep: true,

          handler() {
            console.log('baz watcher');
          },
        },
        qux() {
          console.log('qux watcher');
        },
      },
    });
    "
  `);
});
