import { it, expect } from 'vitest';
import { transform, findManualMigrations } from 'vue-metamorph';
import { wrapperDestroyCodemodPlugin, wrapperDestroyManualMigrationPlugin } from './wrapperDestroy';

it('should transform wrapper.destroy() to wrapper.unmount()', () => {
  const input = `
const wrapper = mount(Foo);
wrapper.destroy();  
`;

  expect(transform(input, 'file.spec.js', [wrapperDestroyCodemodPlugin]).code).toMatchInlineSnapshot(`
    "const wrapper = mount(Foo);
    wrapper.unmount();
    "
  `);
});

it('should find manual migrations if the call object is not called wrapper', () => {
  const input = `
const weirdNameWeDontKnowAbout = {
  destroy() {
    window = null;
  }
};

weirdNameWeDontKnowAbout.destroy();
`;
  expect(findManualMigrations(input, 'file.spec.js', [wrapperDestroyManualMigrationPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 32,
        "columnStart": 1,
        "file": "file.spec.js",
        "lineEnd": 8,
        "lineStart": 8,
        "message": "Possibly rename destroy() to unmount()
    See: https://test-utils.vuejs.org/migration/#destroy-is-now-unmount-to-match-Vue-3",
        "pluginName": "test-utils-wrapper-destroy-manual",
        "snippet": "5 |   }
    6 | };
    7 | 
    8 | weirdNameWeDontKnowAbout.destroy();
      | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    9 | ",
      },
    ]
  `);
});
