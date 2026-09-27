import { describe, expectTypeOf, it } from 'vitest';
import type { AiConfig, OpenAIModelId } from './config';

type ModelOf<Provider> = Extract<
  Partial<AiConfig>,
  { provider?: Provider }
>['model'];

describe('AiConfig model', () => {
  it('suggests the models of the selected provider', () => {
    expectTypeOf<'gpt-4.1'>().toExtend<ModelOf<'openai'>>();
    expectTypeOf<'claude-haiku-4-5'>().toExtend<ModelOf<'anthropic'>>();
    expectTypeOf<OpenAIModelId>().toExtend<ModelOf<'openai'>>();
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
