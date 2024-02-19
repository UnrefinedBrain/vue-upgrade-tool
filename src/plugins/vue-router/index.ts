import { Plugin } from 'vue-metamorph';
import { vueRouterInstantiationPlugin } from './instantiation';
import { catchAllPlugin } from './catch-all';
import { onReadyPlugin } from './onReady';
import { routerLinkPropsPlugin } from './router-link-props';

export const vueRouter = (): Plugin[] => ([
  vueRouterInstantiationPlugin,
  catchAllPlugin,
  onReadyPlugin,
  routerLinkPropsPlugin,
]);
