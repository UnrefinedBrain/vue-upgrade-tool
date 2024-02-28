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
    "
  `);
});
