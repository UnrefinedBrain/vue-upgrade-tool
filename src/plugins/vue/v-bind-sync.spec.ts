import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { vBindSyncPlugin } from './v-bind-sync';

it('should turn sync bindings into v-model bindings', () => {
  const input = `
<template>
  <div>
    <MyComponent v-bind:foo.sync="foo"></MyComponent>
    <MyComponent :foo.sync="foo"</MyComponent>
    <MyComponent :[foo].sync="foo"</MyComponent>
  </div>
</template>
`;

  expect(transform(input, 'file.vue', [vBindSyncPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div>
        <MyComponent v-model:foo="foo"></MyComponent>
        <MyComponent v-model:foo="foo"</MyComponent>
        <MyComponent v-model:[foo]="foo"</MyComponent>
      </div>
    </template>
    "
  `);
});
