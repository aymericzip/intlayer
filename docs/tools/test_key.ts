import { readFileSync } from 'node:fs';
import { dotenv } from 'node:process';

// Simple .env parser since we're using Bun
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
console.log('Using key:', key ? `${key.substring(0, 10)}...` : 'undefined');

const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`;

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: 'Translate the following word to French: Hello',
          },
        ],
      },
    ],
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
