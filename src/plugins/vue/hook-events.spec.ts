import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { hookEventsPlugin } from './hook-events';

it('should change hook: event listeners to vue:', () => {
  const input = `
<template>
  <div>
    <Foo @hook:updated="onUpdated" />
  </div>
</template>
`;

  expect(transform(input, 'file.vue', [hookEventsPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div>
        <Foo @vue:updated="onUpdated" />
      </div>
    </template>
    "
  `);
});
