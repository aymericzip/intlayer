import { describe, expect, it } from 'vitest';
import { AI_PROVIDER_SETUPS, parseModelIds } from './aiSetup';
import { setIntlayerConfigAi } from './utils/configManipulation';

describe('parseModelIds', () => {
  it('reads OpenAI-style, Google-style and array responses', () => {
    expect(parseModelIds({ data: [{ id: 'b' }, { id: 'a' }] })).toEqual([
      'a',
      'b',
    ]);
    expect(
      parseModelIds({ models: [{ name: 'models/gemini-x' }, { name: 1 }] })
    ).toEqual(['gemini-x']);
    expect(parseModelIds([{ id: 'x' }, { id: 'x' }])).toEqual(['x']);
    expect(parseModelIds('nope')).toEqual([]);
  });
});

describe('AI_PROVIDER_SETUPS', () => {
  it('declares each provider once', () => {
    const providers = AI_PROVIDER_SETUPS.map(({ provider }) => provider);

    expect(new Set(providers).size).toBe(providers.length);
  });
});

describe('setIntlayerConfigAi', () => {
  it('replaces the ai block fields and keeps the others', () => {
    const content = setIntlayerConfigAi(
      "const config = {\n  ai: {\n    provider: 'openai',\n    model: 'gpt-5.6-terra',\n    apiKey: process.env.OPENAI_API_KEY,\n    applicationContext: 'Shop',\n  },\n};\n\nexport default config;\n",
      'ts',
      {
        provider: 'anthropic',
        model: 'claude-haiku-5-5',
        apiKeyEnvironmentVariable: 'ANTHROPIC_API_KEY',
      }
    );

    expect(content).toContain('provider: "anthropic"');
    expect(content).toContain('model: "claude-haiku-5-5"');
    expect(content).toContain('apiKey: process.env.ANTHROPIC_API_KEY');
    expect(content).toContain("applicationContext: 'Shop'");
    expect(content).not.toContain('OPENAI_API_KEY');
  });

  it('adds an ai block to a JSON config without the key reference', () => {
    expect(
      JSON.parse(
        setIntlayerConfigAi('{ "internationalization": {} }', 'json', {
          provider: 'mistral',
          apiKeyEnvironmentVariable: 'MISTRAL_API_KEY',
        })
      )
    ).toEqual({ internationalization: {}, ai: { provider: 'mistral' } });
  });
});
