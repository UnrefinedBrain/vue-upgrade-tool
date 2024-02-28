import { Plugin } from 'vue-metamorph';
import { wrapperDestroyCodemodPlugin, wrapperDestroyManualMigrationPlugin } from './wrapperDestroy';
import { propsDataTestPlugin } from './propsData';
import { createLocalVuePlugin } from './createLocalVue';
import { removedWrapperApisPlugin } from './removed-wrapper-apis';
import { scopedSlotsMountPlugin } from './scopedSlots';
import { globalMountOptionsPlugin } from './global-mount-options';

export const vueTestUtils = (): Plugin[] => ([
  wrapperDestroyCodemodPlugin,
  wrapperDestroyManualMigrationPlugin,
  propsDataTestPlugin,
  createLocalVuePlugin,
  removedWrapperApisPlugin,
  scopedSlotsMountPlugin,
  globalMountOptionsPlugin,
]);
