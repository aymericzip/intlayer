import type { OpenAIProvider } from '@ai-sdk/openai';
import { describe, expectTypeOf, it } from 'vitest';
import type { AiConfig, ProviderModelId } from './config';

type ModelOf<Provider> = Extract<
  Partial<AiConfig>,
  { provider?: Provider }
>['model'];

describe('AiConfig model', () => {
  it('suggests the models of the selected provider', () => {
    expectTypeOf<'gpt-4.1'>().toExtend<ModelOf<'openai'>>();
    expectTypeOf<'claude-haiku-4-5'>().toExtend<ModelOf<'anthropic'>>();
    expectTypeOf<Parameters<OpenAIProvider>[0]>().toEqualTypeOf<
      ProviderModelId<OpenAIProvider>
    >();
  });

  it('falls back to string when the provider SDK is not installed', () => {
    // An unresolved optional peer dependency resolves to `any`
    expectTypeOf<ProviderModelId<any>>().toEqualTypeOf<string>();
  });

  it('accepts unlisted model ids', () => {
    const config: Partial<AiConfig> = {
      provider: 'openai',
      model: 'my-fine-tuned-model',
    };

    expectTypeOf(config).toExtend<Partial<AiConfig>>();
  });

  it('accepts a model without provider', () => {
    const config: Partial<AiConfig> = { model: 'claude-haiku-4-5' };

    expectTypeOf(config).toExtend<Partial<AiConfig>>();
  });

  it('rejects non-string models', () => {
    // @ts-expect-error model must be a string
    const config: Partial<AiConfig> = { provider: 'openai', model: 42 };

    expectTypeOf(config).toExtend<Partial<AiConfig>>();
  });
});
