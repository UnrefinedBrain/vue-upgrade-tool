import { Plugin } from 'vue-metamorph';
import { vListItemGroupValuePlugin } from './v-list-item-group-value';
import { textColorPlugin } from './text-colors';
import { vListItemContentPlugin } from './v-list-item-content';
import { vChipPlugin } from './v-chip';
import { vSelectChangePlugin } from './v-select-change';
import { vSelectVAutocompletePlugin } from './v-select-v-autocomplete';
import { vTabsPlugin } from './v-tabs';
import { vSimpleTablePlugin } from './v-simple-table';
import { vVirtualScrollPlugin } from './v-virtual-scroll';
import { vTextFieldPlugin } from './v-text-field';
import { vTooltipActivatorsPlugin } from './v-tooltip-activators';
import { vDialogVMenuPlugin } from './v-dialog-v-menu';
import { vAlertPlugin } from './v-alert';

export const vuetify = (): Plugin[] => ([
  vListItemGroupValuePlugin,
  textColorPlugin,
  vListItemContentPlugin,
  vChipPlugin,
  vSelectChangePlugin,
  vSelectVAutocompletePlugin,
  vTabsPlugin,
  vSimpleTablePlugin,
  vVirtualScrollPlugin,
  vTextFieldPlugin,
  vTooltipActivatorsPlugin,
  vDialogVMenuPlugin,
  vAlertPlugin,
]);