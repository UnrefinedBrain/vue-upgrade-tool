# vue-upgrade

WIP codemod built on vue-metamorph to upgrade Vue 2 projects to Vue 3.

It will upgrade JS/TS files, SFCs, and unit tests.

| Plugin | Type | Link to migration guide |
| - | - | - |
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