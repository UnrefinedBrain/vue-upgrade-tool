import { expect, it } from 'vitest';
import { transform } from 'vue-metamorph';
import { globalMountOptionsPlugin } from './global-mount-options';

it('should construct a new global object in mount options', () => {
  const input = `
// should remove the createLocalVue import
import { shallowMount, createLocalVue } from '@vue/test-utils';

// should remove createLocalVue call and localVue.* calls
const localVue = createLocalVue();
localVue.mixin({
  data() {
    return {
      foo: 'bar'
    }
  }
});

localVue.directive('asdf', {
  // directive body
});

localVue.component('MyButton', MyButton);

it('test', () => {
  // should remove the localVue option
  // should move store,router,i18n into global.plugins
  // should move mocks to global.mocks
  // should move stubs to global.stubs
  // should move localVue.directive() to global.directives
  // should move localVue.component() to global.components
  // should move localVue.mixin() to global.mixins
  shallowMount(SomeComponent, {
    localVue,
    store,
    router,
    i18n,
    mocks: {
      // some mocks
    },
    stubs: {
      // some stubs
    }
  });
});
`;

  expect(transform(input, 'file.spec.js', [globalMountOptionsPlugin]).code).toMatchInlineSnapshot(`
    "// should remove the createLocalVue import
    import { shallowMount } from '@vue/test-utils';

    it('test', () => {
      // should remove the localVue option
      // should move store,router,i18n into global.plugins
      // should move mocks to global.mocks
      // should move stubs to global.stubs
      // should move localVue.directive() to global.directives
      // should move localVue.component() to global.components
      // should move localVue.mixin() to global.mixins
      shallowMount(SomeComponent, {
        global: {
          mixins: [{
            data() {
              return {
                foo: 'bar'
              }
            }
          }],

          directives: {
            'asdf': {
              // directive body
            },
          },

          components: {
            'MyButton': MyButton,
          },

          plugins: [store, router, i18n],

          mocks: {
            // some mocks
          },

          stubs: {
            // some stubs
          },
        },
      });
    });
    "
  `);
});

it('should not duplicate existing mount options objects', () => {
  const input = `
mount(Component, {
  global: {
    mocks: {

    }
  }
});
`;

  expect(transform(input, 'file.spec.js', [globalMountOptionsPlugin]).code).toMatchInlineSnapshot(`
    "mount(Component, {
      global: {
        mocks: {

        }
      }
    });
    "
  `);
});

it('should not remove localVue calls that are not feeding the global property', () => {
  const input = `
localVue.nextTick();
await localVue.nextTick();
`;

  expect(transform(input, 'file.spec.js', [globalMountOptionsPlugin]).code).toMatchInlineSnapshot(`
    "localVue.nextTick();
    await localVue.nextTick();
    "
  `);
});
