import { it, expect } from 'vitest';
import { transform } from 'vue-metamorph';
import { transitionGroupRootElementPlugin } from './transition-group-root-element';

it('should add a tag attribute to a transition-group if one is not present', () => {
  const input = `
<template>
  <div>
    <transition-group>
      should add a tag="span"
    </transition-group>

    <transition-group tag="div">
      should leave this one alone
    </transition-group>

    <transition-group :tag="dynamicTag">
      should leave this one alone
    </transition-group>
  </div>
</template>  
`;

  expect(transform(input, 'file.vue', [transitionGroupRootElementPlugin]).code).toMatchInlineSnapshot(`
    "
    <template>
      <div>
        <transition-group tag="span">
          should add a tag="span"
        </transition-group>

        <transition-group tag="div">
          should leave this one alone
        </transition-group>

        <transition-group :tag="dynamicTag">
          should leave this one alone
        </transition-group>
      </div>
    </template>  
    "
  `);
});
