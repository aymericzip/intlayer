import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function translateZhV9() {
  const enPath = 'docs/docs/en/releases/v9.md';
  const outDir = 'docs/docs/zh/releases';
  const outPath = join(outDir, 'v9.md');

  console.log('[v9.md] Translating Simplified Chinese (zh) using Claude...');
  const enContent = readFileSync(enPath, 'utf-8');

  const prompt = `You are a professional documentation translator. Translate the following English markdown file (Intlayer v9 Release Notes) into Simplified Chinese.

Rules:
- Keep all code blocks and technical terms intact
- Preserve frontmatter (YAML) as-is
- Translate all headings, descriptions, and body text
- Maintain markdown formatting
- Preserve HTML tags and special syntax like <TOC /> and <Tab />
- Keep link URLs exactly as they are

Source English Markdown:
${enContent}

Return ONLY the translated markdown file. Do not add any explanations or wrap in code blocks.`;

  const message = await client.messages.create({
    model: 'claude-opus-4-8',
    max_tokens: 4000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const translatedText =
    message.content[0].type === 'text' ? message.content[0].text : '';

  // Clean markdown response
  let cleaned = translatedText.trim();
  if (cleaned.startsWith('```markdown') || cleaned.startsWith('```md')) {
    cleaned = cleaned.replace(/^```(markdown|md)\n/, '').replace(/\n```$/, '');
  } else if (cleaned.startsWith('```') && cleaned.endsWith('```')) {
    cleaned = cleaned.slice(3, -3).trim();
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, cleaned, 'utf-8');
  console.log(`[v9.md] Saved to ${outPath}`);
}

translateZhV9().catch(console.error);
