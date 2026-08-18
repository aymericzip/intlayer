import { describe, expect, it } from 'vitest';
import { extractVueIntlayerFieldUsage } from './extractVueFieldUsage';

const plainVariables = [
  { variableName: 'content', dictionaryKey: 'benchmark' },
];

describe('extractVueIntlayerFieldUsage', () => {
  it('collects fields read directly on the proxy in <script setup>', () => {
    const code = `
<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';

const content = useIntlayer('benchmark');

const rows = computed(() => [
  content.n01_t,
  content.n02_enu(-2),
  content.n17_nested_object.level1.level2,
]);
</script>

<template>
  <div>{{ rows }}</div>
</template>
`;

    expect(extractVueIntlayerFieldUsage(code, plainVariables)).toEqual(
      new Map([
        ['benchmark', new Set(['n01_t', 'n02_enu', 'n17_nested_object'])],
      ])
    );
  });

  it('collects fields read through the legacy `.value` accessor', () => {
    const code = `
<script setup lang="ts">
const content = useIntlayer('benchmark');
const title = content.value.n01_t;
</script>

<template><span>{{ title }}</span></template>
`;

    expect(extractVueIntlayerFieldUsage(code, plainVariables)).toEqual(
      new Map([['benchmark', new Set(['n01_t'])]])
    );
  });

  it('collects fields read in the template', () => {
    const code = `
<script setup lang="ts">
const content = useIntlayer('benchmark');
</script>

<template>
  <component :is="content.n06_md" />
  <span>{{ content.n25_plural_md(1) }}</span>
</template>
`;

    expect(extractVueIntlayerFieldUsage(code, plainVariables)).toEqual(
      new Map([['benchmark', new Set(['n06_md', 'n25_plural_md'])]])
    );
  });

  it('merges script and template usage of the same binding', () => {
    const code = `
<script setup lang="ts">
const content = useIntlayer('benchmark');
const enumeration = content.n02_enu(1);
</script>

<template>
  <component :is="content.n06_md" />
</template>
`;

    expect(extractVueIntlayerFieldUsage(code, plainVariables)).toEqual(
      new Map([['benchmark', new Set(['n02_enu', 'n06_md'])]])
    );
  });

  it('never reports the node `value` accessor as a content field', () => {
    const code = `
<script setup lang="ts">
const content = useIntlayer('benchmark');
const raw = content.n01_t.value;
</script>

<template><span>{{ content.value }}</span></template>
`;

    expect(extractVueIntlayerFieldUsage(code, plainVariables)).toEqual(
      new Map([['benchmark', new Set(['n01_t'])]])
    );
  });

  it('omits dictionaries whose fields cannot be resolved', () => {
    const code = `
<script setup lang="ts">
const content = useIntlayer('benchmark');
</script>

<template><span>nothing</span></template>
`;

    expect(extractVueIntlayerFieldUsage(code, plainVariables)).toEqual(
      new Map()
    );
  });

  it('returns an empty map when no binding is provided', () => {
    expect(extractVueIntlayerFieldUsage('<template />', [])).toEqual(new Map());
  });
});
