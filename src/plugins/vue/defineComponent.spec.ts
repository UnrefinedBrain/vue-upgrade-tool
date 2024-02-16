import { transform } from 'vue-metamorph';
import { it, expect } from 'vitest';
import { defineComponentPlugin } from './defineComponent';

it('should update SFC options to use defineComponent', () => {
  const input = `
<script>
export default {
  computed: {
    one() {
      return 1;
    },

    two() {
      return this.one + this.one;
    },
  },
};
</script>
`;

  expect(transform(input, 'file.vue', [defineComponentPlugin]).code).toMatchInlineSnapshot(`
    "
    <script>import { defineComponent } from 'vue';

    export default defineComponent({
      computed: {
        one() {
          return 1;
        },

        two() {
          return this.one + this.one;
        },
      },
    });
    </script>
    "
  `);
});

it('should update other component options to defineComponent', () => {
  const input = `
import Vue from 'vue';

const withVueExtend = Vue.extend({
  computed: {
    one() {
      return 1;
    },

    two() {
      return this.one + this.one;
    },
  },
});

const withVueComponent = Vue.extend({
  computed: {
    three() {
      return 3;
    },

    six() {
      return this.three + this.three;
    },
  },
});
`;

  expect(transform(input, 'file.js', [defineComponentPlugin]).code).toMatchInlineSnapshot(`
    "import Vue, { defineComponent } from 'vue';

    const withVueExtend = defineComponent({
      computed: {
        one() {
          return 1;
        },

        two() {
          return this.one + this.one;
        },
      },
    });

    const withVueComponent = defineComponent({
      computed: {
        three() {
          return 3;
        },

        six() {
          return this.three + this.three;
        },
      },
    });
    "
  `);
});
