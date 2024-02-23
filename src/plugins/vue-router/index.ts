import { Plugin } from 'vue-metamorph';
import { vueRouterInstantiationPlugin } from './instantiation';
import { catchAllPlugin } from './catch-all';
import { onReadyPlugin } from './onReady';
import { routerLinkPropsPlugin } from './router-link-props';
import { getMatchedComponentsPlugin } from './getMatchedComponents';
import { routerAppPlugin } from './router-app';
import { routerViewSlotContentPlugin } from './router-view-slot-content';

export const vueRouter = (): Plugin[] => ([
  vueRouterInstantiationPlugin,
  catchAllPlugin,
  onReadyPlugin,
  routerLinkPropsPlugin,
  getMatchedComponentsPlugin,
  routerAppPlugin,
  routerViewSlotContentPlugin,
]);
