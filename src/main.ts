import { createVueMetamorphCli } from 'vue-metamorph';
import process from 'process';

import { vue } from './plugins/vue/index.js';
import { vuex } from './plugins/vuex/index.js';
import { vueTestUtils } from './plugins/vue-test-utils/index.js';
import { vueRouter } from './plugins/vue-router/index.js';

const cli = createVueMetamorphCli({
  plugins: [
    vue(),
    vuex(),
    vueTestUtils(),
    vueRouter(),
  ],
});

process.on('SIGQUIT', cli.abort);
process.on('SIGTERM', cli.abort);
process.on('SIGINT', cli.abort);

cli.run();
