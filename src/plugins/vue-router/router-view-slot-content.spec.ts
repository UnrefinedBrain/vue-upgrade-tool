import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { routerViewSlotContentPlugin } from './router-view-slot-content';

it('should wrap router-view children', () => {
  const input = `
<template>
  <router-view>
    <p> This is the first child </p>
    <p> This is the second child </p>
  </router-view>
</template>
`;

  expect(transform(input, 'file.vue', [routerViewSlotContentPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <router-view v-slot="{
      Component,
    }">
    <component :is="Component">
        <p> This is the first child </p>
        <p> This is the second child </p>
      </component>
    </router-view>
    </template>
    "
  `);
});
