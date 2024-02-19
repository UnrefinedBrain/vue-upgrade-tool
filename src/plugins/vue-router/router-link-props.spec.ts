import { it, expect } from 'vitest';
import { findManualMigrations } from 'vue-metamorph';
import { routerLinkPropsPlugin } from './router-link-props';

it('should warn on <router-link append>', () => {
  const input = `
<template>
  <div>
    <router-link
      to="/"
      append
    >
      Link
    </router-link>
    <RouterLink
      to="/"
      append
    >
      Link
    </RouterLink>
  </div>
</template>
`;

  expect(findManualMigrations(input, 'file.vue', [routerLinkPropsPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 12,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 6,
        "lineStart": 6,
        "message": "The 'append' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-append-prop-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "3 |   <div>
    4 |     <router-link
    5 |       to="/"
    6 |       append
      |       ^^^^^^
    7 |     >
    8 |       Link
    9 |     </router-link>",
      },
    ]
  `);
});

it('should warn on <router-link event>', () => {
  const input = `
<template>
  <div>
    <router-link
      to="/"
      event="dblclick"
    >
      Link
    </router-link>
    <RouterLink
      to="/"
      event="dblclick"
    >
      Link
    </RouterLink>
    <router-link
      to="/"
      :event="'dblclick'"
    >
      Link
    </router-link>
    <RouterLink
      to="/"
      :event="'dblclick'"
    >
      Link
    </RouterLink>
  </div>
</template>
`;

  expect(findManualMigrations(input, 'file.vue', [routerLinkPropsPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 22,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 6,
        "lineStart": 6,
        "message": "The 'event' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "3 |   <div>
    4 |     <router-link
    5 |       to="/"
    6 |       event="dblclick"
      |       ^^^^^^^^^^^^^^^^
    7 |     >
    8 |       Link
    9 |     </router-link>",
      },
      {
        "columnEnd": 25,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 18,
        "lineStart": 18,
        "message": "The 'event' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "15 |     </RouterLink>
    16 |     <router-link
    17 |       to="/"
    18 |       :event="'dblclick'"
       |       ^^^^^^^^^^^^^^^^^^^
    19 |     >
    20 |       Link
    21 |     </router-link>",
      },
    ]
  `);
});

it('should warn on <router-link tag>', () => {
  const input = `
<template>
  <div>
    <router-link
      to="/"
      tag="span"
    >
      Link
    </router-link>
    <RouterLink
      to="/"
      tag="span"
    >
      Link
    </RouterLink>
    <router-link
      to="/"
      :tag="'span'"
    >
      Link
    </router-link>
    <RouterLink
      to="/"
      :tag="'span'"
    >
      Link
    </RouterLink>
  </div>
</template>
`;

  expect(findManualMigrations(input, 'file.vue', [routerLinkPropsPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 16,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 6,
        "lineStart": 6,
        "message": "The 'tag' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "3 |   <div>
    4 |     <router-link
    5 |       to="/"
    6 |       tag="span"
      |       ^^^^^^^^^^
    7 |     >
    8 |       Link
    9 |     </router-link>",
      },
      {
        "columnEnd": 19,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 18,
        "lineStart": 18,
        "message": "The 'tag' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "15 |     </RouterLink>
    16 |     <router-link
    17 |       to="/"
    18 |       :tag="'span'"
       |       ^^^^^^^^^^^^^
    19 |     >
    20 |       Link
    21 |     </router-link>",
      },
    ]
  `);
});
