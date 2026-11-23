import { TechLogo, type TechLogoName } from '@intlayer/design-system/tech-logo';
import type { FC } from 'react';

const providers: Array<{ name: string; logoName: TechLogoName }> = [
  { name: 'OpenAI', logoName: 'openai' },
  { name: 'Claude', logoName: 'claude' },
  { name: 'Ollama', logoName: 'ollama' },
  { name: 'Mistral', logoName: 'mistral' },
  { name: 'DeepSeek', logoName: 'deepseek' },
];

/** Static row of the model providers the CLI can call. */
export const ProvidersCarousel: FC = () => (
  <div className="w-full border-b border-neutral px-4 sm:px-6 md:px-12">
    <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-6">
      {providers.map(({ name, logoName }) => (
        <li
          key={name}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <TechLogo
            name={logoName}
            className="size-5 shrink-0 [&_path]:fill-current!"
            aria-hidden="true"
          />
          {name}
        </li>
      ))}
    </ul>
  </div>
);
