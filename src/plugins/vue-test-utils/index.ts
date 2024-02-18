import { Plugin } from 'vue-metamorph';
import { wrapperDestroyCodemodPlugin, wrapperDestroyManualMigrationPlugin } from './wrapperDestroy';

export const vueTestUtils = (): Plugin[] => ([
  wrapperDestroyCodemodPlugin,
  wrapperDestroyManualMigrationPlugin,
]);
