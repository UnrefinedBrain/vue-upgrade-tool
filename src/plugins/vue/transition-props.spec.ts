import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { transitionPropsPlugin } from './transition-props';

it('should rename transition props', () => {
  const input = `
<template>
  <transition
    enter-class="someEnterClass"
    leave-class="someLeaveClass"
  >
    child
  </transition>

  <transition
    :enter-class="someEnterClass"
    :leave-class="someLeaveClass"
  >
    child
  </transition>
</template>

<style>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-leave,
.v-enter-to {
  opacity: 1;
}
</style>
`;

  expect(transform(input, 'file.vue', [transitionPropsPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <transition
        enter-from-class="someEnterClass"
        leave-from-class="someLeaveClass"
      >
        child
      </transition>

      <transition
        :enter-from-class="someEnterClass"
        :leave-from-class="someLeaveClass"
      >
        child
      </transition>
    </template>

    <style>
    .v-enter-from,
    .v-leave-to {
      opacity: 0;
    }

    .v-leave-from,
    .v-enter-to {
      opacity: 1;
    }
    </style>
    "
  `);
});
