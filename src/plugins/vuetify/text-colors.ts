//@ts-nocheck
import { CodemodPlugin } from 'vue-metamorph';
import * as changeCase from 'change-case';

export const textColorPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vuetify-text-colors',
  transform({ sfcAST, utils: { traverseTemplateAST } }) {
    let count = 0;

    if (sfcAST) {
      traverseTemplateAST(sfcAST, {
        leaveNode(node) {
          if (node.type === 'VAttribute' && node.key?.name === 'class') {
            const value = node.value?.value;
            if (value) {
              const replacements = [
                { from: '--text', to: '-' },
                { from: '--background', to: '-bg' },
                { from: '--border', to: '-border' },
                { from: '--icon', to: '-icon' },
                { from: '--disabled', to: '-disabled' },
                { from: '--hover', to: '-hover' },
                { from: '--focus', to: '-focus' },
                { from: '--active', to: '-active' },
                { from: '--selected', to: '-selected' },
                { from: '--error', to: '-error' },
                { from: '--success', to: '-success' },
                { from: '--warning', to: '-warning' },
                { from: '--info', to: '-info' },
                { from: '--primary', to: '-primary' },
                { from: '--secondary', to: '-secondary' },
                { from: '--tertiary', to: '-tertiary' },
                { from: '--quaternary', to: '-quaternary' },
                { from: '--accent', to: '-accent' },
                { from: '--dark', to: '-dark' },
                { from: '--light', to: '-light' },
                { from: '--transparent', to: '-transparent' },
                { from: '--elevation', to: '-elevation' },
                { from: '--rounded', to: '-rounded' },
                { from: '--square', to: '-square' },
                { from: '--circle', to: '-circle' },
                { from: '--small', to: '-small' },
                { from: '--medium', to: '-medium' },
                { from: '--large', to: '-large' },
                { from: '--extra-large', to: '-extra-large' },
                { from: '--full-width', to: '-full-width' },
                { from: '--full-height', to: '-full-height' },
                { from: '--flex', to: '-flex' },
                { from: '--inline-block', to: '-inline-block' },
                { from: '--block', to: '-block' },
                { from: '--inline', to: '-inline' },
                { from: '--hidden', to: '-hidden' },
                { from: '--visible', to: '-visible' },
                { from: '--scrollable', to: '-scrollable' },
                { from: '--overflow-hidden', to: '-overflow-hidden' },
                { from: '--overflow-visible', to: '-overflow-visible' },
                { from: '--overflow-auto', to: '-overflow-auto' },
                { from: '--overflow-scroll', to: '-overflow-scroll' },
                { from: '--overflow-x-hidden', to: '-overflow-x-hidden' },
                { from: '--overflow-y-hidden', to: '-overflow-y-hidden' },
                { from: '--overflow-x-visible', to: '-overflow-x-visible' },
                { from: '--overflow-y-visible', to: '-overflow-y-visible' },
                { from: '--overflow-x-auto', to: '-overflow-x-auto' },
                { from: '--overflow-y-auto', to: '-overflow-y-auto' },
                { from: '--overflow-x-scroll', to: '-overflow-x-scroll' },
                { from: '--overflow-y-scroll', to: '-overflow-y-scroll' },
                { from: '--position-relative', to: '-position-relative' },
                { from: '--position-absolute', to: '-position-absolute' },
                { from: '--position-fixed', to: '-position-fixed' },
                { from: '--position-sticky', to: '-position-sticky' },
                { from: '--position-static', to: '-position-static' },
                { from: '--position-initial', to: '-position-initial' },
                { from: '--position-final', to: '-position-final' },
                { from: '--position-center', to: '-position-center' },
                { from: '--position-top', to: '-position-top' },
                { from: '--position-bottom', to: '-position-bottom' },
                { from: '--position-left', to: '-position-left' },
                { from: '--position-right', to: '-position-right' },
                { from: '--position-top-left', to: '-position-top-left' },
                { from: '--position-top-right', to: '-position-top-right' },
                { from: '--position-bottom-left', to: '-position-bottom-left' },
                { from: '--position-bottom-right', to: '-position-bottom-right' },
                { from: '--position-center-left', to: '-position-center-left' },
                { from: '--position-center-right', to: '-position-center-right' },
                { from: '--position-center-top', to: '-position-center-top' },
                { from: '--position-center-bottom', to: '-position-center-bottom' },
                { from: '--position-center-horizontal', to: '-position-center-horizontal' },
                { from: '--position-center-vertical', to: '-position-center-vertical' },
                { from: '--position-center-all', to: '-position-center-all' },
                { from: '--position-center-middle', to: '-position-center-middle' },
                { from: '--position-center-middle-horizontal', to: '-position-center-middle-horizontal' },
                { from: '--position-center-middle-vertical', to: '-position-center-middle-vertical' },
                { from: '--position-center-middle-horizontal-vertical', to: '-position-center-middle-horizontal-vertical' },
                { from: '--position-center-middle-horizontal-vertical-all', to: '-position-center-middle-horizontal-vertical-all' },
              ];

              let updatedValue = value;
              replacements.forEach(({ from, to }) => {
                updatedValue = updatedValue.replace(new RegExp(`\\b${changeCase.camelCase(changeCase.pascalCase(from))}\\b`, 'g'), to);
                count++;
              });

              node.value.value = updatedValue;
            }
          }
        },
      });
    }

    return count;
  },
};