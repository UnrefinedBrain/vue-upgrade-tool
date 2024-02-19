# vue-upgrade

WIP codemod built on vue-metamorph to upgrade Vue 2 projects to Vue 3.

It will upgrade JS/TS files, SFCs, and unit tests. Results are not guaranteed to be perfect! There very well may be edge cases I missed. Please open an issue if you spot something it did wrong!

## Vue

| Plugin | Type | Link to migration guide |
| - | - | - |
| [`$children` removed](./src/plugins/vue/children.ts) | manual migration | [Link](https://v3-migration.vuejs.org/breaking-changes/children.html) |
| [`data` option must return a function](./src/plugins/vue/data-function.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/data-option.html) |
| [component options wrapped with `defineComponent()`](./src/plugins/vue/defineComponent.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/global-api.html#type-inference) |
| [`Vue.delete()` / `this.$delete()` rewritten to `delete` expression](./src/plugins/vue/delete.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/#removed-apis) |
| [remove `.native` modifier from v-on directives](./src/plugins/vue/event-listeners-native.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/v-on-native-modifier-removed.html) |
| [warn on vue filter usage](./src/plugins/vue/filters.ts) | manual migration | [Link](https://v3-migration.vuejs.org/breaking-changes/filters.html) |
| [remove functional component markers](./src/plugins/vue/functional-component.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/functional-components.html) |
| [global application instance / app instantiation](./src/plugins/vue/global.ts) | manual migration | [Link](https://v3-migration.vuejs.org/breaking-changes/global-api.html) |
| [render function h()](./src/plugins/vue/h.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/render-function-api.html) |
| [`hook:` events renamed to `vue:`](./src/plugins/vue/hook-events.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/vnode-lifecycle-events.html) |
| [`v-if` / `v-for` precedence changed](./src/plugins/vue/if-for-precedence.ts) | manual migration | [Link](https://v3-migration.vuejs.org/breaking-changes/v-if-v-for.html) |
| [`$nextTick()`](./src/plugins/vue/nextTick.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/global-api-treeshaking.html#_3-x-syntax) |
| [`$scopedSlots` removed](./src/plugins/vue/scopedSlots.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/slots-unification.html#slots-unification) |
| [`Vue.set()` removed](./src/plugins/vue/set.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/#removed-apis) |
| [`v-bind:foo.sync` becomes v-model:foo](./src/plugins/vue/v-bind-sync.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/v-model.html) |
| [`$listeners` removed](./src/plugins/vue/listeners.ts) | codemod / manual migration | [Link](https://v3-migration.vuejs.org/breaking-changes/listeners-removed) |
| [`destroyed` and `beforeDestroy` lifecycle hooks renamed](./src/plugins/vue/lifecycle-hooks.ts) | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/#other-minor-changes) |
| v-model updates | codemod | [Link](https://v3-migration.vuejs.org/breaking-changes/v-model.html) |
| `is` attribute can only be used on a `<component>` tag | manual migration | [Link](https://v3-migration.vuejs.org/breaking-changes/custom-elements-interop.html#customized-built-in-elements)

## Vue Router

| Plugin | Type | Link to migration guide |
| - | - | - |
| [vue-router instantiation changed (WIP)](./src/plugins/vue-router/instantiation.ts) | codemod | [Link](https://router.vuejs.org/guide/migration/#new-Router-becomes-createRouter) |
| [catch-all routes syntax changed](./src/plugins/vue-router/catch-all.ts) | manual migration | [Link](https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes) |
| `currentRoute.something` becomes `currentRoute.value.something` | codemod | [Link](https://router.vuejs.org/guide/migration/#Removed-star-or-catch-all-routes) |
| `onReady` removed | codemod | [Link](https://router.vuejs.org/guide/migration/#Replaced-onReady-with-isReady) |
| `append` prop in `router-link` removed | manual migration | [Link](https://router.vuejs.org/guide/migration/#Removal-of-append-prop-in-router-link-) |
| `event` and `tag` props in `router-link` removed | manual migration | [Link](https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-) |
| `exact` prop in `router-link` removed | codemod | [Link](https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-) |
| `router.match()` removed | manual migration | [Link](https://router.vuejs.org/guide/migration/#Removal-of-router-match-and-changes-to-router-resolve) |
| `router.getMatchedComponents()` removed | codemod | [Link](https://router.vuejs.org/guide/migration/#Removal-of-router-getMatchedComponents-) |
| `router.app` removed | manual migration | [Link](https://router.vuejs.org/guide/migration/#Removal-of-router-app) |
| passing slot content to `router-view` | codemod | [Link](https://router.vuejs.org/guide/migration/#Passing-content-to-route-components-slot-) |
| `RouteConfig`, `Location`, `Route` types renamed | codemod | [Link](https://router.vuejs.org/guide/migration/#TypeScript-changes) |

## Vuex

| Plugin | Type | Link to migration guide |
| - | - | - |
| [Store instantiation changed](./src/plugins/vuex/instantiation.ts) | codemod | [Link](https://vuex.vuejs.org/guide/migrating-to-4-0-from-3-x.html#installation-process) |

## Vue Test Utils

| Plugin | Type | Link to migration guide |
| - | - | - |
| `propsData` mount option renamed to `props` | codemod | [Link](https://test-utils.vuejs.org/migration/#propsData-is-now-props) |
| new `global` mount option | codemod | [Link](https://test-utils.vuejs.org/migration/#mocks-and-stubs-are-now-in-global) |
| `createLocalVue` removed | codemod | [Link](https://test-utils.vuejs.org/migration/#No-more-createLocalVue) |
| shallowMount no longer renders default slot | codemod | [Link](https://test-utils.vuejs.org/migration/#shallowMount-and-renderStubDefaultSlot) |
| `wrapper.destroy()` renamed to `wrapper.unmount()` | codemod | [Link](https://test-utils.vuejs.org/migration/#destroy-is-now-unmount-to-match-Vue-3) |
| `scopedSlots` option merged with `slots` | codemod | [Link](https://test-utils.vuejs.org/migration/#scopedSlots-is-now-merged-with-slots) |
| Wrapper APIs removed | manual migration | [Link](https://test-utils.vuejs.org/migration/#Wrapper-API-mount-) |