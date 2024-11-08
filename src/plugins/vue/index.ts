import { Plugin } from 'vue-metamorph';
import { vueSetManualPlugin, vueSetPlugin } from './set';
import { vueDeletePlugin } from './delete';
import { vueGlobalPlugin } from './global';
import { contextualHPlugin } from './h';
import { defineComponentPlugin } from './defineComponent';
import { eventListenersNativePlugin } from './event-listeners-native';
import { hookEventsPlugin } from './hook-events';
import { vBindSyncPlugin } from './v-bind-sync';
import { scopedSlotsPlugin } from './scopedSlots';
import { nextTickPlugin } from './nextTick';
import { lifecycleHookPlugin } from './lifecycle-hooks';
import { dataFunctionPlugin } from './data-function';
import { ifForPrecedencePlugin } from './if-for-precedence';
import { functionalComponentPlugin } from './functional-component';
import { removeListenersCodemodPlugin, removeListenersManualMigrationPlugin } from './listeners';
import { filtersPlugin } from './filters';
import { childrenPlugin } from './children';
import { propsDefaultThisPlugin } from './props-default-this';
import { vModelPlugin } from './v-model';
import { isAttributePlugin } from './is-attribute';
import { vDeepPlugin } from './v-deep';
import { arrayWatchPlugin } from './array-watch';
import { emitsNonSfcPlugin, emitsSfcPlugin } from './emits';

export const vue = (): Plugin[] => ([
  vueSetPlugin,
  vueSetManualPlugin,
  vueDeletePlugin,
  vueGlobalPlugin,
  contextualHPlugin,
  defineComponentPlugin,
  eventListenersNativePlugin,
  hookEventsPlugin,
  vBindSyncPlugin,
  scopedSlotsPlugin,
  nextTickPlugin,
  lifecycleHookPlugin,
  dataFunctionPlugin,
  ifForPrecedencePlugin,
  functionalComponentPlugin,
  removeListenersCodemodPlugin,
  removeListenersManualMigrationPlugin,
  filtersPlugin,
  childrenPlugin,
  propsDefaultThisPlugin,
  vModelPlugin,
  isAttributePlugin,
  vDeepPlugin,
  arrayWatchPlugin,
  emitsSfcPlugin,
  emitsNonSfcPlugin,
]);
