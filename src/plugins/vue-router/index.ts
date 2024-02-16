import { Plugin } from 'vue-metamorph';
import { vueRouterInstantiationPlugin } from './instantiation.js';

export const vueRouter = (): Plugin[] => ([
  vueRouterInstantiationPlugin,
]);
