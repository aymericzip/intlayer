import { describe, expect, it } from 'vitest';
import { intlayerSvelteExtract } from './svelte-intlayer-extract';

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

const extract = (code: string, dictionaryKey = 'app') =>
  intlayerSvelteExtract(code, '/src/App.svelte', {
    packageName: 'svelte-intlayer',
    dictionaryKey,
    shouldExtract,
    generateKey,
    attributesToExtract: ATTRS,
  });

// ── Tests ────────────────────────────────────────────────────────────────────

describe('intlayerSvelteExtract – template text', () => {
  it('extracts plain text and replaces it with {$content.key}', () => {
    const code = `
<script>
</script>
<h1>Hello World</h1>
`;
    const result = extract(code);
    expect(result).not.toBeNull();
    expect(result!.extracted).toBe(true);
    expect(result!.code).toContain('{$content.helloWorld}');
    expect(result!.code).not.toContain('Hello World');
  });

  it('skips single-word text', () => {
    const code = `
<script>
</script>
<h1>Intlayer</h1>
`;
    const result = extract(code);
    expect(result).toBeNull();
  });

  it('skips lowercase-starting text', () => {
    const code = `
<script>
</script>
<p>lower case sentence</p>
`;
    const result = extract(code);
    expect(result).toBeNull();
  });

  it('extracts multiple text nodes', () => {
    const code = `
<script>
</script>
<h1>Hello World</h1>
<p>Welcome Back</p>
`;
    const result = extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain('{$content.helloWorld}');
    expect(result!.code).toContain('{$content.welcomeBack}');
  });
});

describe('intlayerSvelteExtract – template attributes', () => {
  it('extracts placeholder attribute and replaces with placeholder={$content.key}', () => {
    const code = `
<script>
</script>
<input placeholder="Enter Name" />
`;
    const result = extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain('placeholder={$content.enterName}');
    expect(result!.code).not.toContain('placeholder="Enter Name"');
  });

  it('extracts aria-label attribute', () => {
    const code = `
<script>
</script>
<div aria-label="Hello World"></div>
`;
    const result = extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain('aria-label={$content.helloWorld}');
  });

  it('ignores non-extractable attributes (e.g. class, src)', () => {
    const code = `
<script>
</script>
<img src="Some Image" class="my-class" />
`;
    const result = extract(code);
    expect(result).toBeNull();
  });
});

describe('intlayerSvelteExtract – import and hook injection', () => {
  it('injects useIntlayer import and content declaration', () => {
    const code = `
<script>
</script>
<h1>Hello World</h1>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();
    expect(result!.code).toContain(
      "import { useIntlayer } from 'svelte-intlayer';"
    );
    expect(result!.code).toContain("const content = useIntlayer('app');");
  });

  it('does not duplicate import when useIntlayer is already present', () => {
    const code = `
<script>
  import { useIntlayer } from 'svelte-intlayer';
  const content = useIntlayer('app');
</script>
<h1>Hello World</h1>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();
    const matches = result!.code.match(
      /import.*useIntlayer.*from.*svelte-intlayer/g
    );
    expect(matches?.length).toBe(1);
  });

  it('does not inject const declaration when already present', () => {
    const code = `
<script>
  import { useIntlayer } from 'svelte-intlayer';
  const content = useIntlayer('app');
</script>
<h1>Hello World</h1>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();
    const matches = result!.code.match(/const content = useIntlayer/g);
    expect(matches?.length).toBe(1);
  });

  it('prepends a <script> block when the component has no script', () => {
    const code = `<h1>Hello World</h1>`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();
    expect(result!.code).toContain('<script>');
    expect(result!.code).toContain(
      "import { useIntlayer } from 'svelte-intlayer';"
    );
    expect(result!.code).toContain("const content = useIntlayer('app');");
  });
});

describe('intlayerSvelteExtract – script extraction', () => {
  it('extracts string literals in script and replaces with get(content).key', () => {
    const code = `
<script>
  const msg = "Hello World";
</script>
<div></div>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();
    // Script strings use get(content) to unwrap the svelte store
    expect(result!.code).toContain('get(content).helloWorld');
    expect(result!.code).not.toContain('"Hello World"');
  });

  it('injects svelte/store get import when script has extractable strings', () => {
    const code = `
<script>
  const msg = "Hello World";
</script>
<div></div>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();
    expect(result!.code).toContain("import { get } from 'svelte/store';");
  });

  it('does not inject svelte/store get when only template text is extracted', () => {
    const code = `
<script>
</script>
<h1>Hello World</h1>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();
    expect(result!.code).not.toContain("from 'svelte/store'");
  });

  it('does not extract strings inside useIntlayer calls', () => {
    const code = `
<script>
  import { useIntlayer } from 'svelte-intlayer';
  const content = useIntlayer('my-key');
</script>
<div></div>
`;
    const result = extract(code, 'app');
    // "my-key" is single word and wouldn't pass shouldExtract anyway, but the
    // guard on useIntlayer calls should be active.
    expect(result).toBeNull();
  });

  it('returns null when nothing is extractable', () => {
    const code = `
<script>
  const x = someHelper();
</script>
<div class="container">{someVar}</div>
`;
    const result = extract(code);
    expect(result).toBeNull();
  });
});

describe('intlayerSvelteExtract – existing destructured call', () => {
  it('adds missing keys to existing destructured useIntlayer and uses bare key in template', () => {
    const code = `
<script>
  import { useIntlayer } from 'svelte-intlayer';
  const { title } = useIntlayer('app');
</script>
<h1>{title}</h1>
<p>New paragraph text</p>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();

    // Template text replaced with bare key (no '$content.' prefix)
    expect(result!.code).toContain('{newParagraphText}');
    expect(result!.code).not.toContain('{$content.newParagraphText}');

    // Missing key added to the existing destructuring
    expect(result!.code).toMatch(/\{\s*title,\s*newParagraphText\s*\}/);

    // No duplicate useIntlayer call injected
    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });

  it('adds missing keys for extractable attributes when call is destructured', () => {
    const code = `
<script>
  import { useIntlayer } from 'svelte-intlayer';
  const { title } = useIntlayer('app');
</script>
<input placeholder="Enter Email" />
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();

    // Attribute replaced with bare key (no '$content.' prefix)
    expect(result!.code).toContain('placeholder={enterEmail}');
    expect(result!.code).not.toContain('placeholder={$content.enterEmail}');

    // Key added to destructuring
    expect(result!.code).toMatch(/\{\s*title,\s*enterEmail\s*\}/);

    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });

  it('does not inject new content declaration when existing call is destructured', () => {
    const code = `
<script>
  import { useIntlayer } from 'svelte-intlayer';
  const { title, description } = useIntlayer('app');
</script>
<h1>Hello World</h1>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();

    // No 'const content = useIntlayer' should be injected
    expect(result!.code).not.toMatch(/const content = useIntlayer/);

    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });

  it('handles destructured call with extractable script strings — no svelte/store import', () => {
    const code = `
<script>
  import { useIntlayer } from 'svelte-intlayer';
  const { title } = useIntlayer('app');
  const label = "Submit Button";
</script>
<div></div>
`;
    const result = extract(code, 'app');
    expect(result).not.toBeNull();

    // Script string replaced with bare key (no 'get(content).' prefix)
    expect(result!.code).toContain('submitButton');
    expect(result!.code).not.toContain('get(content).submitButton');

    // Key added to destructuring
    expect(result!.code).toMatch(/\{\s*title,\s*submitButton\s*\}/);

    // No svelte/store import needed for destructured plain values
    expect(result!.code).not.toContain("from 'svelte/store'");

    const callCount = (result!.code.match(/useIntlayer\(/g) ?? []).length;
    expect(callCount).toBe(1);
  });
});

describe('intlayerSvelteExtract – insertion (mixed text + expression tags)', () => {
  it('extracts mixed text and expression tag as insertion content', () => {
    const code = `
<script>
</script>
<p>Hello {name}!</p>
`;
    const result = extract(code);
    expect(result).not.toBeNull();
    expect(result!.extracted).toBe(true);
    // Template replaced with function call
    expect(result!.code).toContain('{$content.helloName({ name: name })}');
    // Original text removed
    expect(result!.code).not.toContain('Hello {name}!');
  });

  it('extracts mixed content with member expression variable', () => {
    const code = `
<script>
</script>
<p>Welcome {user.name}!</p>
`;
    const result = extract(code);
    expect(result).not.toBeNull();
    expect(result!.code).toContain(
      '{$content.welcomeName({ name: user.name })}'
    );
  });

  it('does not extract element with only expression tag (no significant text)', () => {
    const code = `
<script>
</script>
<p>{name}</p>
`;
    const result = extract(code);
    expect(result).toBeNull();
  });
});

describe('intlayerSvelteExtract – onExtract callback', () => {
  it('calls onExtract with extracted content map', () => {
    const code = `
<script>
</script>
<h1>Hello World</h1>
`;
    const results: Record<string, string>[] = [];
    intlayerSvelteExtract(code, '/src/App.svelte', {
      dictionaryKey: 'app',
      shouldExtract,
      generateKey,
      attributesToExtract: ATTRS,
      onExtract: (r) => results.push(r.content),
    });
    expect(results).toHaveLength(1);
    expect(results[0]).toHaveProperty('helloWorld', 'Hello World');
  });
});
