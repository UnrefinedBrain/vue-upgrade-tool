import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { vDeepPlugin } from './v-deep';

it('should transform v-deep', () => {
  const input = `
<style>
.foo :v-deep .bar {
  color: red;
}

.foo ::v-deep .bar {
  color: green;
}

.foo /deep/ .bar {
  color: orange;
}

.foo :v-deep .bar,
.foo :v-deep .baz {
  color: blue;
}

::v-deep .foo,
::v-deep .bar {
  color: purple;
}

.foo ::v-deep > * {
  color: brown;
}

.foo::v-deep .bar {
  color: tan;
}
</style>
`;

  expect(transform(input, 'file.vue', [vDeepPlugin]).code).toMatchInlineSnapshot(`
    "
    <style>
    .foo :deep(.bar) {
      color: red;
    }

    .foo :deep(.bar) {
      color: green;
    }

    .foo :deep(.bar) {
      color: orange;
    }

    .foo :deep(.bar),
    .foo :deep(.baz) {
      color: blue;
    }

    :deep(.foo),
    :deep(.bar) {
      color: purple;
    }

    .foo > :deep(*) {
      color: brown;
    }

    .foo:deep(.bar) {
      color: tan;
    }
    </style>
    "
  `);
});
