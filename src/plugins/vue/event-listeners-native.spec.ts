import { transform } from 'vue-metamorph';
import { it, expect } from 'vitest';
import { eventListenersNativePlugin } from './event-listeners-native';

it('should remove .native modifier from v-on', () => {
  const input = `
<template>
  <div>
    <MyButton @click.native="console.log('button 1 clicked');" />
    <MyButton v-on:click.native="console.log('button 2 clicked);" />
  </div>
</template>
`;

  expect(transform(input, 'file.vue', [eventListenersNativePlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div>
        <MyButton @click="console.log('button 1 clicked');" />
        <MyButton v-on:click="console.log('button 2 clicked);" />
      </div>
    </template>
    "
  `);
});
