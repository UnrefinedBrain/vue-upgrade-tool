import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { lifecycleHookPlugin } from './lifecycle-hooks';

it('should rename vue component lifecycle hooks', () => {
  const input = `
<script>
export default {
  destroyed() {
    console.log('destroyed');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  }
}

Vue.component({
  destroyed() {
    console.log('destroyed');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  }
});

Vue.mixin({
  destroyed() {
    console.log('destroyed');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  }
});

Vue.extend({
  destroyed() {
    console.log('destroyed');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  }
});

defineComponent({
  destroyed() {
    console.log('destroyed');
  },
  beforeDestroy() {
    console.log('beforeDestroy');
  }
})
</script>
`;

  expect(transform(input, 'file.vue', [lifecycleHookPlugin]).code).toMatchInlineSnapshot(`
    "
    <script>
    export default {
      unmounted() {
        console.log('destroyed');
      },
      beforeUnmount() {
        console.log('beforeDestroy');
      }
    }

    Vue.component({
      unmounted() {
        console.log('destroyed');
      },
      beforeUnmount() {
        console.log('beforeDestroy');
      }
    });

    Vue.mixin({
      unmounted() {
        console.log('destroyed');
      },
      beforeUnmount() {
        console.log('beforeDestroy');
      }
    });

    Vue.extend({
      unmounted() {
        console.log('destroyed');
      },
      beforeUnmount() {
        console.log('beforeDestroy');
      }
    });

    defineComponent({
      unmounted() {
        console.log('destroyed');
      },
      beforeUnmount() {
        console.log('beforeDestroy');
      }
    })
    </script>
    "
  `);
});
