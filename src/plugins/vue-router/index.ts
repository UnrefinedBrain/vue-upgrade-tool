import { Plugin } from 'vue-metamorph';
import { vueRouterInstantiationPlugin } from './instantiation.js';
import { catchAllPlugin } from './catch-all.js';

export const vueRouter = (): Plugin[] => ([
  vueRouterInstantiationPlugin,
  catchAllPlugin,
]);
