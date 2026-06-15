import {
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { join } from 'node:path';

// Parse .env file
const envText = readFileSync('docs/.env', 'utf-8');
const env: Record<string, string> = {};
for (const line of envText.split('\n')) {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
}

const key = env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!key) {
  console.error('GOOGLE_GENERATIVE_AI_API_KEY not found in docs/.env');
  process.exit(1);
}

const customInstructions = readFileSync(
  'docs/tools/prompts/CUSTOM_INSTRUCTIONS.md',
  'utf-8'
);

const locales: { code: string; name: string }[] = [
  { code: 'ar', name: 'Arabic' },
  { code: 'de', name: 'German' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'hi', name: 'Hindi' },
  { code: 'id', name: 'Indonesian' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'pl', name: 'Polish' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'tr', name: 'Turkish' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'zh', name: 'Simplified Chinese' },
  { code: 'zh-TW', name: 'Traditional Chinese' },
  { code: 'en-GB', name: 'British English' },
];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const callGeminiWithRetry = async (
  prompt: string,
  retries = 10
): Promise<string> => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.1,
          },
        }),
      });

      const data = await response.json();
      if (response.status === 429 || response.status === 503) {
        console.warn(
          `Gemini API returned status ${response.status}: ${JSON.stringify(data)}. Sleeping 90 seconds to reset window... (Attempt ${i + 1}/${retries})`
        );
        await sleep(90000);
        continue;
      }

      if (!response.ok) {
        throw new Error(`Gemini API error: ${JSON.stringify(data)}`);
      }
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error(`Empty response from Gemini: ${JSON.stringify(data)}`);
      }
      await sleep(45000); // Wait 45 seconds after each successful request to avoid rate limit
      return text;
    } catch (error) {
      if (i === retries - 1) {
        throw error;
      }
      console.warn(
        `Error during fetch: ${error}. Sleeping 90 seconds before retry... (Attempt ${i + 1}/${retries})`
      );
      await sleep(90000);
    }
  }
  throw new Error('Failed to fetch from Gemini API after retries');
};

const cleanMarkdownResponse = (text: string): string => {
  let cleaned = text.trim();
  if (cleaned.startsWith('```markdown')) {
    cleaned = cleaned.slice('```markdown'.length);
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
  } else if (cleaned.startsWith('```md')) {
    cleaned = cleaned.slice('```md'.length);
    if (cleaned.endsWith('```')) {
      cleaned = cleaned.slice(0, -3);
    }
  } else if (cleaned.startsWith('```') && cleaned.endsWith('```')) {
    cleaned = cleaned.slice(3, -3);
  }
  return cleaned.trim();
};

const translateV9 = async (localeCode: string, localeName: string) => {
  const enPath = 'docs/docs/en/releases/v9.md';
  const outDir = `docs/docs/${localeCode}/releases`;
  const outPath = join(outDir, 'v9.md');

  if (existsSync(outPath) && statSync(outPath).size > 1000) {
    console.log(
      `[v9.md] ${localeName} (${localeCode}) translation already exists. Skipping.`
    );
    return;
  }

  console.log(`[v9.md] Translating to ${localeName} (${localeCode})...`);
  const enContent = readFileSync(enPath, 'utf-8');

  const prompt = `You are a professional documentation translator translating Intlayer project documentation.
Translate the following English markdown file (Intlayer v9 Release Notes) into ${localeName} (${localeCode}).

### Custom Translation Instructions:
${customInstructions}

### Source English Markdown to Translate:
${enContent}

Return ONLY the translated markdown file. Do not wrap it in a code block or add any conversational text.`;

  const translatedText = await callGeminiWithRetry(prompt);
  const cleanedContent = cleanMarkdownResponse(translatedText);

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, cleanedContent, 'utf-8');
  console.log(`[v9.md] Saved to ${outPath}`);
};

const translateV8 = async (localeCode: string, localeName: string) => {
  const enPath = 'docs/docs/en/releases/v8.md';
  const targetPath = `docs/docs/${localeCode}/releases/v8.md`;

  if (!existsSync(targetPath)) {
    console.warn(
      `[v8.md] target file does not exist at ${targetPath}. Skipping.`
    );
    return;
  }

  const targetContent = readFileSync(targetPath, 'utf-8');

  if (
    targetContent.includes('Unicode CLDR') ||
    targetContent.includes('IntlayerNode') ||
    targetContent.includes('C++ Watcher') ||
    targetContent.includes('Vite Bundler')
  ) {
    console.log(
      `[v8.md] ${localeName} (${localeCode}) translation already seems updated. Skipping.`
    );
    return;
  }

  console.log(
    `[v8.md] Translating and updating to ${localeName} (${localeCode})...`
  );
  const enContent = readFileSync(enPath, 'utf-8');

  const prompt = `You are a professional documentation translator translating Intlayer project documentation.
I have an updated English v8 release notes and an existing localized v8 release notes file in ${localeName}.
Please update the localized v8 release notes by translating the newly added sections from English, and inserting them into the appropriate positions in the localized file.
Keep all existing translations exactly as they are. Do not translate code blocks unless they contain comments.

The newly added sections in English are:
1. "## YAML & Markdown Content Files (v8.10.0)"
2. "## Unicode CLDR Plural Rules (v8.8.0)"
3. "## TypeScript: IntlayerNode Primitive Accessors"
4. "## Tooling: C++ Watcher & OXC-based LSP (v8.12.0)"
5. "## Experimental Build Optimizations: Minify & Purge (v8.7.0)"
6. "## Angular Support: Vite Bundler (v8.11.0)"
7. "## Sitemap Generation (v8.6.0)"

### Custom Translation Instructions:
${customInstructions}

### Updated English v8.md:
${enContent}

### Existing Localized v8.md in ${localeName} (${localeCode}):
${targetContent}

Return ONLY the complete updated localized markdown file. Do not wrap it in a code block or add any conversational text.`;

  const translatedText = await callGeminiWithRetry(prompt);
  const cleanedContent = cleanMarkdownResponse(translatedText);

  writeFileSync(targetPath, cleanedContent, 'utf-8');
  console.log(`[v8.md] Saved to ${targetPath}`);
};

const run = async () => {
  for (const locale of locales) {
    try {
      await translateV9(locale.code, locale.name);
      await translateV8(locale.code, locale.name);
    } catch (e) {
      console.error(`Error processing locale ${locale.code}:`, e);
    }
  }
  console.log('ALL TRANSLATIONS PROCESSED.');
};

run();
