import { CodemodPlugin } from 'vue-metamorph';

const vDeepRegex = /(.*?)( +)?(?:(?::{1,2}v-deep)|(?:\/deep\/)) ?(>)? ?(.*)/s;

export const vDeepPlugin: CodemodPlugin = {
  type: 'codemod',
  name: 'vue-v-deep',
  transform({ styleASTs }) {
    let count = 0;

    for (const styleAST of styleASTs) {
      styleAST.walkRules((rule) => {
        if (!vDeepRegex.test(rule.selector)) {
          return;
        }

        const parts = rule.selector.split(',');
        for (let i = 0; i < parts.length; i++) {
          if (!vDeepRegex.test(parts[i]!)) {
            continue;
          }

          const [, before, spacing, middle, after] = parts[i]!.match(vDeepRegex)!;
          let str = before ?? '';

          if (before) {
            str += spacing ?? '';
          }

          if (middle) {
            str += `${middle} `;
          }

          str += `:deep(${after})`;

          parts[i] = str;
        }

        rule.selector = parts.join(',');
        count++;
      });
    }

    return count;
  },
};
