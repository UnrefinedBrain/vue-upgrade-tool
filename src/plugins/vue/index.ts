import { Plugin } from 'vue-metamorph';
import { vueSetManualPlugin, vueSetPlugin } from './set';
import { vueDeletePlugin } from './delete';
import { vueGlobalPlugin } from './global';
import { contextualHPlugin } from './h';
import { defineComponentPlugin } from './defineComponent';
import { eventListenersNativePlugin } from './event-listeners-native';
import { hookEventsPlugin } from './hook-events';

export const vue = (): Plugin[] => ([
  vueSetPlugin,
  vueSetManualPlugin,
  vueDeletePlugin,
  vueGlobalPlugin,
  contextualHPlugin,
  defineComponentPlugin,
  eventListenersNativePlugin,
  hookEventsPlugin,
]);
