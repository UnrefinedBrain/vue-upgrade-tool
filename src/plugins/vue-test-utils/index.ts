import { Plugin } from 'vue-metamorph';
import { wrapperDestroyCodemodPlugin, wrapperDestroyManualMigrationPlugin } from './wrapperDestroy';
import { propsDataTestPlugin } from './propsData';
import { createLocalVuePlugin } from './createLocalVue';

export const vueTestUtils = (): Plugin[] => ([
  wrapperDestroyCodemodPlugin,
  wrapperDestroyManualMigrationPlugin,
  propsDataTestPlugin,
  createLocalVuePlugin,
]);
