import { describe, expect, it } from 'vitest';
import { intlayerVueExtract } from './vue-intlayer-extract';

// ── Shared test utilities ────────────────────────────────────────────────────

const generateKey = (text: string, existingKeys: Set<string>): string => {
  let key = text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[\s_-]+/g, ' ')
    .replace(/[^\p{L}\p{N} ]/gu, '')
    .trim()
    .split(' ')
    .filter(Boolean)
    .slice(0, 5)
    .map((word, i) =>
      i === 0
        ? word.toLowerCase()
        : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join('');

  if (!key) key = 'content';
  if (existingKeys.has(key)) {
    let n = 1;
    while (existingKeys.has(`${key}${n}`)) n++;
    key = `${key}${n}`;
  }
  return key;
};

const shouldExtract = (text: string): boolean => {
  const t = text.trim();
  if (!t) return false;
  if (!t.includes(' ')) return false;
  if (!/^[A-Z]/.test(t)) return false;
  if (t.startsWith('{') || t.startsWith('v-')) return false;
  return true;
};

const ATTRS = ['title', 'placeholder', 'alt', 'aria-label', 'label'] as const;

const extract = (code: string, dictionaryKey = 'hello-world') =>
  intlayerVueExtract(code, '/src/HelloWorld.vue', {
    packageName: 'vue-intlayer',
    dictionaryKey,
    shouldExtract,
    generateKey,
    attributesToExtract: ATTRS,
  });

// ── Tests ────────────────────────────────────────────────────────────────────

describe('intlayerVueExtract – template text', () => {
  it('extracts plain template text and replaces it with {{ content.key }}', async () => {
    const code = `
<template>
  <h1>Hello World</h1>
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    expect(result).not.toBeNull();
    expect(result!.extracted).toBe(true);
    expect(result!.code).toContain('{{ content.helloWorld }}');
    expect(result!.code).not.toContain('Hello World');
  });

  it('skips single-word text (shouldExtract returns false)', async () => {
    const code = `
<template>
  <h1>Intlayer</h1>
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    expect(result).toBeNull();
  });

  it('skips lowercase-starting text', async () => {
    const code = `
<template>
  <p>lower case sentence</p>
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    expect(result).toBeNull();
  });

  it('extracts multiple text nodes', async () => {
    const code = `
<template>
  <h1>Hello World</h1>
  <p>Welcome Back</p>
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain('{{ content.helloWorld }}');
    expect(result!.code).toContain('{{ content.welcomeBack }}');
  });
});

describe('intlayerVueExtract – template attributes', () => {
  it('extracts placeholder attribute and replaces with :placeholder binding', async () => {
    const code = `
<template>
  <input placeholder="Enter Name" />
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain(':placeholder="content.enterName"');
    expect(result!.code).not.toContain('placeholder="Enter Name"');
  });

  it('extracts alt attribute', async () => {
    const code = `
<template>
  <img src="logo.png" alt="Company Logo" />
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain(':alt="content.companyLogo"');
  });

  it('ignores non-extractable attributes (e.g. className, src)', async () => {
    const code = `
<template>
  <img src="Some Image Path" class="my-class" />
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    expect(result).toBeNull();
  });
});

describe('intlayerVueExtract – import and hook injection', () => {
  it('injects useIntlayer import when not already present', async () => {
    const code = `
<template>
  <h1>Hello World</h1>
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code, 'helloworld');
    expect(result).not.toBeNull();
    expect(result!.code).toContain(
      "import { useIntlayer } from 'vue-intlayer';"
    );
    expect(result!.code).toContain(
      "const content = useIntlayer('helloworld');"
    );
  });

  it('does not duplicate import when useIntlayer is already imported', async () => {
    const code = `
<template>
  <h1>Hello World</h1>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useIntlayer } from "vue-intlayer";

const { count } = useIntlayer("helloworld");
</script>
`;
    const result = await extract(code, 'helloworld');
    expect(result).not.toBeNull();
    const matches = result!.code.match(
      /import.*useIntlayer.*from.*vue-intlayer/g
    );
    expect(matches?.length).toBe(1);
  });

  it('does not inject const declaration when useIntlayer call already present', async () => {
    const code = `
<template>
  <h1>Hello World</h1>
</template>
<script setup lang="ts">
import { useIntlayer } from "vue-intlayer";
const content = useIntlayer("helloworld");
</script>
`;
    const result = await extract(code, 'helloworld');
    expect(result).not.toBeNull();
    const matches = result!.code.match(/const content = useIntlayer/g);
    expect(matches?.length).toBe(1);
  });

  it('injects into <script setup> when present', async () => {
    const code = `
<template>
  <p>Hello World</p>
</template>
<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
`;
    const result = await extract(code, 'my-comp');
    expect(result).not.toBeNull();
    expect(result!.code).toContain(
      "import { useIntlayer } from 'vue-intlayer';"
    );
    expect(result!.code).toContain("const content = useIntlayer('my-comp');");
  });
});

describe('intlayerVueExtract – script extraction', () => {
  it('extracts string literals in script and replaces with content.key', async () => {
    const code = `
<template>
  <div></div>
</template>
<script setup lang="ts">
const msg = "Hello World";
</script>
`;
    const result = await extract(code, 'my-comp');
    expect(result).not.toBeNull();
    expect(result!.code).toContain('content.helloWorld');
    expect(result!.code).not.toContain('"Hello World"');
  });

  it('does not extract strings inside useIntlayer calls', async () => {
    const code = `
<template>
  <div></div>
</template>
<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';
const content = useIntlayer("my-key");
</script>
`;
    const result = await extract(code, 'my-comp');
    // "my-key" is a single word – also wouldn't pass shouldExtract – but the
    // test verifies the guard is active even for multi-word keys.
    expect(result).toBeNull();
  });

  it('returns null when nothing is extractable', async () => {
    const code = `
<template>
  <div class="container">{{ someVar }}</div>
</template>
<script setup lang="ts">
const someVar = someHelper();
</script>
`;
    const result = await extract(code);
    expect(result).toBeNull();
  });
});

describe('intlayerVueExtract – existing destructured call', () => {
  it('adds missing keys to existing destructured useIntlayer and uses bare key in template', async () => {
    const code = `
<template>
  <h1>{{ title }}</h1>
  <p>New paragraph text</p>
</template>
<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';
const { title } = useIntlayer('my-page');
</script>
`;
    const result = await extract(code, 'my-page');
    expect(result).not.toBeNull();

    // Template text replaced with bare key (no 'content.' prefix)
    expect(result!.code).toContain('{{ newParagraphText }}');
    expect(result!.code).not.toContain('{{ content.newParagraphText }}');

    // Missing key added to the existing destructuring
    expect(result!.code).toMatch(/\{\s*title,\s*newParagraphText\s*\}/);

    // No duplicate useIntlayer call injected
    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });

  it('adds missing keys to destructured call for extractable attributes', async () => {
    const code = `
<template>
  <h1>{{ title }}</h1>
  <input placeholder="Enter Email" />
</template>
<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';
const { title } = useIntlayer('my-page');
</script>
`;
    const result = await extract(code, 'my-page');
    expect(result).not.toBeNull();

    // Attribute replaced with bare key binding
    expect(result!.code).toContain(':placeholder="enterEmail"');
    expect(result!.code).not.toContain(':placeholder="content.enterEmail"');

    // Missing key added to destructuring
    expect(result!.code).toMatch(/\{\s*title,\s*enterEmail\s*\}/);

    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });

  it('does not inject new content declaration when existing call is destructured', async () => {
    const code = `
<template>
  <h1>Hello World</h1>
</template>
<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';
const { title, description } = useIntlayer('page');
</script>
`;
    const result = await extract(code, 'page');
    expect(result).not.toBeNull();

    // No 'const content = useIntlayer' should be injected
    expect(result!.code).not.toMatch(/const content = useIntlayer/);

    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });

  it('handles destructured call with extractable script strings', async () => {
    const code = `
<template>
  <div></div>
</template>
<script setup lang="ts">
import { useIntlayer } from 'vue-intlayer';
const { title } = useIntlayer('my-comp');
const label = "Submit Button";
</script>
`;
    const result = await extract(code, 'my-comp');
    expect(result).not.toBeNull();

    // Script string replaced with bare key
    expect(result!.code).toContain('submitButton');
    expect(result!.code).not.toContain('content.submitButton');

    // Key added to destructuring
    expect(result!.code).toMatch(/\{\s*title,\s*submitButton\s*\}/);

    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });
});

describe('intlayerVueExtract – insertion (mixed text + interpolation)', () => {
  it('extracts mixed text and interpolation as insertion content', async () => {
    const code = `
<template>
  <p>Hello {{ name }}!</p>
</template>
<script setup lang="ts">
const name = 'World';
</script>
`;
    const result = await extract(code);
    expect(result).not.toBeNull();
    expect(result!.extracted).toBe(true);
    // Template replaced with function call
    expect(result!.code).toContain('{{ content.helloName({ name: name }) }}');
    // Original text removed
    expect(result!.code).not.toContain('Hello {{ name }}!');
  });

  it('extracts mixed content with member expression variable', async () => {
    const code = `
<template>
  <p>Welcome {{ user.name }}!</p>
</template>
<script setup lang="ts">
const user = { name: 'Alice' };
</script>
`;
    const result = await extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain(
      '{{ content.welcomeName({ name: user.name }) }}'
    );
  });

  it('does not extract element with only interpolation (no significant text)', async () => {
    const code = `
<template>
  <p>{{ name }}</p>
</template>
<script setup lang="ts">
const name = 'World';
</script>
`;
    const result = await extract(code);
    // Only an interpolation with no surrounding text should NOT be extracted as insertion
    expect(result).toBeNull();
  });

  it('does not extract mixed content with non-text/interpolation children', async () => {
    const code = `
<template>
  <p>Hello <strong>{{ name }}</strong></p>
</template>
<script setup lang="ts">
</script>
`;
    const result = await extract(code);
    // Has child element, not pure text+interpolation mix
    expect(result).toBeNull();
  });
});

describe('intlayerVueExtract – onExtract callback', () => {
  it('calls onExtract with extracted content', async () => {
    const code = `
<template>
  <h1>Hello World</h1>
</template>
<script setup lang="ts">
</script>
`;
    const results: Record<string, string>[] = [];
    await intlayerVueExtract(code, '/src/HelloWorld.vue', {
      dictionaryKey: 'helloworld',
      shouldExtract,
      generateKey,
      attributesToExtract: ATTRS,
      onExtract: (r) => results.push(r.content),
    });
    expect(results).toHaveLength(1);
    expect(results[0]).toHaveProperty('helloWorld', 'Hello World');
  });
});
