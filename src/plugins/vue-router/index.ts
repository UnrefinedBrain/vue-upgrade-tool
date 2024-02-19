import { Plugin } from 'vue-metamorph';
import { vueRouterInstantiationPlugin } from './instantiation';
import { catchAllPlugin } from './catch-all';
import { onReadyPlugin } from './onReady';

export const vueRouter = (): Plugin[] => ([
  vueRouterInstantiationPlugin,
  catchAllPlugin,
  onReadyPlugin,
]);
