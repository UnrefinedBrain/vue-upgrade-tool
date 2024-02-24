import { transform } from 'vue-metamorph';
import { it, expect } from 'vitest';
import { vModelPlugin } from './v-model';

it('should rename the value prop to modelValue', () => {
  const input = `
<script>
export default {
  props: {
    value: String,
  },
};
</script>
`;
  expect(transform(input, 'file.vue', [vModelPlugin]).code).toMatchInlineSnapshot(`
    "
    <script>
    export default {
      props: {
        modelValue: String,
      },
    };
    </script>
    "
  `);
});

it('should convert this.value to this.modelValue', () => {
  const input = `
<script>
export default {
  methods: {
    log() {
      const twoPlaces = this.value.toFixed(2);
      console.log(this.value);
    },
  },
};
</script>
`;

  expect(transform(input, 'file.vue', [vModelPlugin]).code).toMatchInlineSnapshot(`
    "
    <script>
    export default {
      methods: {
        log() {
          const twoPlaces = this.modelValue.toFixed(2);
          console.log(this.modelValue);
        },
      },
    };
    </script>
    "
  `);
});

it('should convert this.$emit("input") to this.$emit("update:modelValue")', () => {
  const input = `
<script>
export default {
  methods: {
    log() {
      this.$emit('input', 5);
    },
  },
};
</script>
`;

  expect(transform(input, 'file.vue', [vModelPlugin]).code).toMatchInlineSnapshot(`
    "
    <script>
    export default {
      methods: {
        log() {
          this.$emit('update:modalValue', 5);
        },
      },
    };
    </script>
    "
  `);
});

it('should convert $emit("input") to $emit("update:modelValue") in template', () => {
  const input = `
<template>
  <button @click="$emit('input', 5)">Set value to 5</button>
</template>
<script>
export default {
  
};
</script>
`;

  expect(transform(input, 'file.vue', [vModelPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <button @click="$emit('update:modelValue', 5)">Set value to 5</button>
    </template>
    <script>
    export default {
      
    };
    </script>
    "
  `);
});

it('should convert v-bind:value to v-bind:modelValue', () => {
  const input = `
<template>
  <div>
    <MyButton :value="v">Set value to 5</MyButton>
    <input :value="5" />
  </div>
</template>
<script>
export default {
  
};
</script>
`;

  expect(transform(input, 'file.vue', [vModelPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div>
        <MyButton :modelValue="v">Set value to 5</MyButton>
        <input :value="5" />
      </div>
    </template>
    <script>
    export default {
      
    };
    </script>
    "
  `);
});

it('should convert v-on:input to v-on:update:modelValue', () => {
  const input = `
<template>
  <div>
    <MyButton @input="console.log">Set value to 5</MyButton>
    <input @input="console.log" />
  </div>
</template>
<script>
export default {
  
};
</script>
`;

  expect(transform(input, 'file.vue', [vModelPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div>
        <MyButton @update:modelValue="console.log">Set value to 5</MyButton>
        <input @input="console.log" />
      </div>
    </template>
    <script>
    export default {
      
    };
    </script>
    "
  `);
});

it('should update value to modelValue in the template', () => {
  const input = `
<template>
  <div>
    {{ value.property }}

    <!-- should not rename object property -->
    {{ obj.value }}
    <MyComponent v-bind="{ value: value }" />
    <MyComponent v-bind="{ value }" />

    <!-- should not rename when it's a function parameter, or shadowed by a function parameter -->
    <MyComponent @foo="(value) => console.log(value)" />

    <!-- should not rename when shadowed by a v-for parameter -->
    <div v-for="value in someArray">
      {{ value }}
    </div>
  </div>
</template>
<script>
export default {
  
};
</script>
`;

  expect(transform(input, 'file.vue', [vModelPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div>
        {{ modelValue.property }}

        <!-- should not rename object property -->
        {{ obj.value }}
        <MyComponent v-bind="{ value: modelValue }" />
        <MyComponent v-bind="{ value: modelValue }" />

        <!-- should not rename when it's a function parameter, or shadowed by a function parameter -->
        <MyComponent @foo="(value) => console.log(value)" />

        <!-- should not rename when shadowed by a v-for parameter -->
        <div v-for="value in someArray">
          {{ value }}
        </div>
      </div>
    </template>
    <script>
    export default {
      
    };
    </script>
    "
  `);
});
