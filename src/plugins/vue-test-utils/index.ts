import { Plugin } from 'vue-metamorph';
import { wrapperDestroyCodemodPlugin, wrapperDestroyManualMigrationPlugin } from './wrapperDestroy';
import { propsDataTestPlugin } from './propsData';

export const vueTestUtils = (): Plugin[] => ([
  wrapperDestroyCodemodPlugin,
  wrapperDestroyManualMigrationPlugin,
  propsDataTestPlugin,
]);
