# vue-upgrade-tool


[![NPM License](https://img.shields.io/npm/l/vue-upgrade-tool)](https://github.com/UnrefinedBrain/vue-upgrade-tool/blob/master/LICENSE) [![NPM Version](https://img.shields.io/npm/v/vue-upgrade-tool)](https://npmjs.com/package/vue-upgrade-tool)
 [![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/UnrefinedBrain/vue-upgrade-tool/ci.yml)](https://github.com/UnrefinedBrain/vue-upgrade-tool/actions)


A codemod built on [vue-metamorph](https://github.com/UnrefinedBrain/vue-metamorph) to upgrade Vue 2 projects to Vue 3.

It will upgrade JS/TS files, SFCs, and unit tests.

> [!IMPORTANT]
> Results are not guaranteed to be perfect! You should manually verify every single change this tool made. There are probably edge cases I missed here. Please [open a GitHub Issue](https://github.com/UnrefinedBrain/vue-upgrade-tool/issues/new) if you spot something it did wrong, or if it should have transformed/reported on something and didn't!



> [!NOTE]
> vue-metamorph does not print well-formatted code when making changes. Use a formatting tool such as eslint or prettier to fix formatting in accordance with your project's code style conventions


## Usage

Since the list of manual migrations can be large depending on your project, it's recommended to pipe the output into a file.

```sh
npx vue-upgrade-tool --files 'src/**/*' > vue_upgrade_output
```

To run only some transformations, lookup their IDs in the table below or find them using `npx vue-upgrade-tool --list-plugins`, then pass them via the `--plugins` flag using a [micromatch pattern](https://github.com/micromatch/micromatch). To use multiple micromatch patterns, pass `--plugins` multiple times:

```sh
npx vue-upgrade-tool --files 'src/**/*' --plugins 'vue-*' --plugins 'test-utils-*' > vue_upgrade_output
```

## Vue

| Plugin | Plugin Name | Migration Type | Migration Guide |
| - | - | - | - |
| [`data` option must return a function](./src/plugins/vue/data-function.spec.ts) | `vue-data-function` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/data-option.html) |
| [component options wrapped with `defineComponent()`](./src/plugins/vue/defineComponent.spec.ts) | `vue-defineComponent` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/global-api.html#type-inference) |
| [`Vue.delete()` / `this.$delete()` rewritten to `delete` expression](./src/plugins/vue/delete.spec.ts) | `vue-delete` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/#removed-apis) |
| [remove `.native` modifier from v-on directives](./src/plugins/vue/event-listeners-native.spec.ts) | `vue-v-on-native` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html) |
| [remove functional component markers](./src/plugins/vue/functional-component.spec.ts) | `vue-functional-component` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/functional-components.html) |
| [render function h()](./src/plugins/vue/h.spec.ts) | `vue-contextual-h` |automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/render-function-api.html) |
| [`hook:` events renamed to `vue:`](./src/plugins/vue/hook-events.spec.ts) | `vue-hook-events` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html) |
| [`$nextTick()`](./src/plugins/vue/nextTick.spec.ts) | `vue-nextTick` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/global-api-treeshaking.html#_3-x-syntax) |
| [`$scopedSlots` removed](./src/plugins/vue/scopedSlots.spec.ts) | `vue-scoped-slots` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/slots-unification.html#slots-unification) |
| [`Vue.set()` removed](./src/plugins/vue/set.spec.ts) | `vue-set` / `vue-set-manual` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/#removed-apis) |
| [`v-bind:foo.sync` becomes v-model:foo](./src/plugins/vue/v-bind-sync.spec.ts) | `vue-v-bind-sync` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/v-model.html) |
| [`$listeners` removed](./src/plugins/vue/listeners.spec.ts) | `vue-remove-$listeners` / `vue-remove-$listeners-manual` | automatic / manual | [Link](https://v3-migration.vuejs.org/breaking-changes/listeners-removed) |
| [`destroyed` and `beforeDestroy` lifecycle hooks renamed](./src/plugins/vue/lifecycle-hooks.spec.ts) | `vue-lifecycle-hooks` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/#other-minor-changes) |
| [v-model updates](./src/plugins/vue/v-model.spec.ts) | `vue-v-model` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/v-model.html) |
| [`transition-group` no longer renders a root element](./src/plugins/vue/transition-group-root-element.spec.ts) | `vue-transition-group-root-element` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/transition-group.html#frontmatter-title) |
| [`transition` props were renamed](./src/plugins/vue/transition-props.spec.ts) | `vue-transition-props` | automatic | [Link](https://v3-migration.vuejs.org/breaking-changes/transition.html#_3-x-update) |
| [`is` attribute can only be used on a `<component>` tag](./src/plugins/vue/is-attribute.spec.ts) | `vue-is-attribute` | manual | [Link](https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html#customized-built-in-elements) |
| [`$children` removed](./src/plugins/vue/children.spec.ts) | `vue-$children` | manual | [Link](https://v3-migration.vuejs.org/breaking-changes/children.html) |
| [`v-if` / `v-for` precedence changed](./src/plugins/vue/if-for-precedence.spec.ts) | `vue-if-for-precedence` | manual | [Link](https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html) |
| [vue filters removed](./src/plugins/vue/filters.spec.ts) | `vue-filters` | manual | [Link](https://v3-migration.vuejs.org/breaking-changes/filters.html) |
| [global application instance / app instantiation](./src/plugins/vue/global.spec.ts) | `vue-globals` | manual | [Link](https://v3-migration.vuejs.org/breaking-changes/global-api.html) |

## Vue Router

| Plugin | Plugin Name | Migration Type | Migration Guide |
| - | - | - | - |
| [vue-router instantiation changed (WIP)](./src/plugins/vue-router/instantiation.spec.ts) | `vue-router-instantiation` | automatic | [Link](https://router.vuejs.org/guide/migration/#new-Router-becomes-createRouter) |
| `currentRoute.something` becomes `currentRoute.value.something` | not yet implemented | automatic | [Link](https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes) |
| [`onReady` replaced with `isReady`](./src/plugins/vue-router/onReady.spec.ts) | `vue-router-onReady` | automatic | [Link](https://router.vuejs.org/guide/migration/#Replaced-onReady-with-isReady) |
| [`router.getMatchedComponents()` removed](./src/plugins/vue-router/getMatchedComponents.spec.ts) | `vue-router-getMatchedComponents'` | automatic | [Link](https://router.vuejs.org/guide/migration/#Removal-of-router-getMatchedComponents-) |
| [passing slot content to `router-view`](./src/plugins/vue-router/router-view-slot-content.spec.ts) | `vue-router-view-slot-content` | automatic | [Link](https://router.vuejs.org/guide/migration/#Passing-content-to-route-components-slot-) |
| `RouteConfig`, `Location`, `Route` types renamed | not yet implemented | automatic | [Link](https://router.vuejs.org/guide/migration/#TypeScript-changes) |
| [`router.app` removed](./src/plugins/vue-router/router-app.spec.ts) | `vue-router-router.app` | manual | [Link](https://router.vuejs.org/guide/migration/#Removal-of-router-app) |
| [catch-all routes syntax changed](./src/plugins/vue-router/catch-all.spec.ts) | `vue-router-catch-all` | manual | [Link](https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes) |
| [`append` prop in `router-link` removed](./src/plugins/vue-router/router-link-props.spec.ts) | `vue-router-link-props` | manual | [Link](https://router.vuejs.org/guide/migration/#Removal-of-append-prop-in-router-link-) |
| [`event` and `tag` props in `router-link` removed](./src/plugins/vue-router/router-link-props.spec.ts) | `vue-router-link-props` | manual | [Link](https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-) |
| [`exact` prop in `router-link` removed](./src/plugins/vue-router/router-link-props.spec.ts) | `vue-router-link-props` | manual | [Link](https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-) |
| [`router.match()` removed](./src/plugins/vue-router/router-match.spec.ts) | `vue-router-match` | manual | [Link](https://router.vuejs.org/guide/migration/#Removal-of-router-match-and-changes-to-router-resolve) |

## Vuex

| Plugin | Plugin Name |Migration Type | Migration Guide |
| - | - | - | - |
| [Store instantiation changed](./src/plugins/vuex/instantiation.spec.ts) | `vuex-instantiation` | automatic | [Link](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#installation-process) |

## Vue Test Utils

| Plugin | Plugin Name |Migration Type | Migration Guide |
| - | - | - | - |
| [`propsData` mount option renamed to `props`](./src/plugins/vue-test-utils/propsData.spec.ts) | `test-utils-propsData` | automatic | [Link](https://test-utils.vuejs.org/migration/#propsData-is-now-props) |
| [new `global` mount option](./src/plugins/vue-test-utils/global-mount-options.spec.ts) | `test-utils-global-mount-options` | automatic | [Link](https://test-utils.vuejs.org/migration/#mocks-and-stubs-are-now-in-global) |
| [`wrapper.destroy()` renamed to `wrapper.unmount()`](./src/plugins/vue-test-utils/wrapperDestroy.spec.ts) | `test-utils-wrapper-destroy` | automatic | [Link](https://test-utils.vuejs.org/migration/#destroy-is-now-unmount-to-match-Vue-3) |
| [`scopedSlots` option merged with `slots`](./src/plugins/vue-test-utils/scopedSlots.spec.ts) | `test-utils-scoped-slots-mount-option` | automatic | [Link](https://test-utils.vuejs.org/migration/#scopedSlots-is-now-merged-with-slots) |
| [`createLocalVue` removed](./src/plugins/vue-test-utils/createLocalVue.spec.ts) | `test-utils-createLocalVue` | manual | [Link](https://test-utils.vuejs.org/migration/#No-more-createLocalVue) |
| [Wrapper APIs removed](./src/plugins/vue-test-utils/removed-wrapper-apis.spec.ts) | `test-utils-removed-wrapper-apis` | manual | [Link](https://test-utils.vuejs.org/migration/#Wrapper-API-mount-) |
