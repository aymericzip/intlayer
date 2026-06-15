import { readFileSync } from 'node:fs';

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

const key = env.OPENAI_API_KEY;
console.log(
  'Using OpenAI key:',
  key ? `${key.substring(0, 10)}...` : 'undefined'
);

const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  },
  body: JSON.stringify({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'user',
        content: 'Translate the following word to French: Hello',
      },
    ],
  }),
});

const data = await response.json();
console.log(JSON.stringify(data, null, 2));
