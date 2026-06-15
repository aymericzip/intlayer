const fs = require('node:fs');
const path = require('node:path');

// Parse .env file
const envText = fs.readFileSync('docs/.env', 'utf-8');
const env = {};
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

const customInstructions = fs.readFileSync(
  'docs/tools/prompts/CUSTOM_INSTRUCTIONS.md',
  'utf-8'
);

async function callGemini(prompt) {
  // Use gemini-1.5-flash to bypass gemini-2.0-flash quota limits
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite-preview:generateContent?key=${key}`;
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

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error(`Empty response from Gemini: ${JSON.stringify(data)}`);
  }
  return text;
}

const cleanMarkdownResponse = (text) => {
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

async function translateV9(localeCode, localeName) {
  const enPath = 'docs/docs/en/releases/v9.md';
  const outDir = `docs/docs/${localeCode}/releases`;
  const outPath = path.join(outDir, 'v9.md');

  if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
    console.log(
      `[v9.md] ${localeName} (${localeCode}) translation already exists. Skipping.`
    );
    return;
  }

  console.log(`[v9.md] Translating to ${localeName} (${localeCode})...`);
  const enContent = fs.readFileSync(enPath, 'utf-8');

  const prompt = `You are a professional documentation translator translating Intlayer project documentation.
Translate the following English markdown file (Intlayer v9 Release Notes) into ${localeName} (${localeCode}).

### Custom Translation Instructions:
${customInstructions}

### Source English Markdown to Translate:
${enContent}

Return ONLY the translated markdown file. Do not wrap it in a code block or add any conversational text.`;

  const translatedText = await callGemini(prompt);
  const cleanedContent = cleanMarkdownResponse(translatedText);

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, cleanedContent, 'utf-8');
  console.log(`[v9.md] Saved to ${outPath}`);
}

async function translateV8(localeCode, localeName) {
  const enPath = 'docs/docs/en/releases/v8.md';
  const targetPath = `docs/docs/${localeCode}/releases/v8.md`;

  if (!fs.existsSync(targetPath)) {
    console.warn(
      `[v8.md] target file does not exist at ${targetPath}. Skipping.`
    );
    return;
  }

  const targetContent = fs.readFileSync(targetPath, 'utf-8');

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
  const enContent = fs.readFileSync(enPath, 'utf-8');

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

  const translatedText = await callGemini(prompt);
  const cleanedContent = cleanMarkdownResponse(translatedText);

  fs.writeFileSync(targetPath, cleanedContent, 'utf-8');
  console.log(`[v8.md] Saved to ${targetPath}`);
}

const args = process.argv.slice(2);
const action = args[0]; // "v8" or "v9" or "both"
const localeCode = args[1];
const localeName = args[2];

if (!action || !localeCode || !localeName) {
  console.error(
    'Usage: node translate_helper.js [v8|v9|both] [localeCode] [localeName]'
  );
  process.exit(1);
}

async function run() {
  try {
    if (action === 'v8' || action === 'both') {
      await translateV8(localeCode, localeName);
    }
    if (action === 'v9' || action === 'both') {
      await translateV9(localeCode, localeName);
    }
  } catch (error) {
    console.error('Error translating:', error);
    process.exit(1);
  }
}

run();
