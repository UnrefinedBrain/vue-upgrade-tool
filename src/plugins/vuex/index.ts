import { Plugin } from 'vue-metamorph';
import { vuexInstantiationPlugin } from './instantiation';

export const vuex = (): Plugin[] => ([
  vuexInstantiationPlugin,
]);
