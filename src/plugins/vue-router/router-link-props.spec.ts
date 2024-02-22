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
      {
        "columnEnd": 12,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 12,
        "lineStart": 12,
        "message": "The 'append' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-append-prop-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": " 9 |     </router-link>
    10 |     <RouterLink
    11 |       to="/"
    12 |       append
       |       ^^^^^^
    13 |     >
    14 |       Link
    15 |     </RouterLink>",
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
        "columnEnd": 22,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 12,
        "lineStart": 12,
        "message": "The 'event' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": " 9 |     </router-link>
    10 |     <RouterLink
    11 |       to="/"
    12 |       event="dblclick"
       |       ^^^^^^^^^^^^^^^^
    13 |     >
    14 |       Link
    15 |     </RouterLink>",
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
      {
        "columnEnd": 25,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 24,
        "lineStart": 24,
        "message": "The 'event' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "21 |     </router-link>
    22 |     <RouterLink
    23 |       to="/"
    24 |       :event="'dblclick'"
       |       ^^^^^^^^^^^^^^^^^^^
    25 |     >
    26 |       Link
    27 |     </RouterLink>",
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
        "columnEnd": 16,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 12,
        "lineStart": 12,
        "message": "The 'tag' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": " 9 |     </router-link>
    10 |     <RouterLink
    11 |       to="/"
    12 |       tag="span"
       |       ^^^^^^^^^^
    13 |     >
    14 |       Link
    15 |     </RouterLink>",
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
      {
        "columnEnd": 19,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 24,
        "lineStart": 24,
        "message": "The 'tag' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-event-and-tag-props-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "21 |     </router-link>
    22 |     <RouterLink
    23 |       to="/"
    24 |       :tag="'span'"
       |       ^^^^^^^^^^^^^
    25 |     >
    26 |       Link
    27 |     </RouterLink>",
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
      exact
    >
      Link
    </router-link>
    <RouterLink
      to="/"
      exact
    >
      Link
    </RouterLink>
    <router-link
      to="/"
      :exact="true"
    >
      Link
    </router-link>
    <RouterLink
      to="/"
      :exact="true"
    >
      Link
    </RouterLink>
  </div>
</template>
`;

  expect(findManualMigrations(input, 'file.vue', [routerLinkPropsPlugin])).toMatchInlineSnapshot(`
    [
      {
        "columnEnd": 11,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 6,
        "lineStart": 6,
        "message": "The 'exact' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "3 |   <div>
    4 |     <router-link
    5 |       to="/"
    6 |       exact
      |       ^^^^^
    7 |     >
    8 |       Link
    9 |     </router-link>",
      },
      {
        "columnEnd": 11,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 12,
        "lineStart": 12,
        "message": "The 'exact' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": " 9 |     </router-link>
    10 |     <RouterLink
    11 |       to="/"
    12 |       exact
       |       ^^^^^
    13 |     >
    14 |       Link
    15 |     </RouterLink>",
      },
      {
        "columnEnd": 19,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 18,
        "lineStart": 18,
        "message": "The 'exact' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "15 |     </RouterLink>
    16 |     <router-link
    17 |       to="/"
    18 |       :exact="true"
       |       ^^^^^^^^^^^^^
    19 |     >
    20 |       Link
    21 |     </router-link>",
      },
      {
        "columnEnd": 19,
        "columnStart": 7,
        "file": "file.vue",
        "lineEnd": 24,
        "lineStart": 24,
        "message": "The 'exact' attribute was removed from router-link
    See: https://router.vuejs.org/guide/migration/#Removal-of-the-exact-prop-in-router-link-",
        "pluginName": "router-link-props",
        "snippet": "21 |     </router-link>
    22 |     <RouterLink
    23 |       to="/"
    24 |       :exact="true"
       |       ^^^^^^^^^^^^^
    25 |     >
    26 |       Link
    27 |     </RouterLink>",
      },
    ]
  `);
});
