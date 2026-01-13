import { Container } from '@intlayer/design-system';
import type { FC } from 'react';
import { ClaudeAI } from './Claude';
import { DeepSeek } from './DeepSeek';
import { MistralAI } from './Mistral';
import { Ollama } from './Ollama';
import { OpenAI } from './OpenAI';

const providers: Array<{ name: string; logo?: FC<{ className?: string }> }> = [
  { name: 'OpenAI', logo: OpenAI },
  { name: 'Claude', logo: ClaudeAI },
  { name: 'Ollama', logo: Ollama },
  { name: 'Mistral', logo: MistralAI },
  { name: 'DeepSeek', logo: DeepSeek },
];

export const ProvidersCarousel: FC = () => {
  return (
    <div className="mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-128px),transparent_100%)] relative mt-8 flex w-full overflow-hidden">
      {/* Fix: Removed 'gap-10' from the container. 
        Infinite loops work best when spacing is handled by the items' margins 
        to ensure the width calculation for the loop reset is precise.
      */}
      <div className="horizontal-loop-4 inline-flex shrink-0 will-change-transform">
        {/* First set of provider cards */}
        {providers.map((provider, index) => {
          const LogoComponent = provider.logo;

          return (
            <div
              key={`${provider.name}-first-${index}`}
              /* Fix: Increased mx-4 to mx-8 to replace the removed gap and ensure consistent spacing */
              className="group z-10 mx-8 inline-flex shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <Container
                roundedSize="3xl"
                className="flex flex-row items-center gap-4 px-5 py-4"
              >
                {LogoComponent && (
                  <LogoComponent
                    className="size-6 shrink-0 transition duration-300 [&_path]:fill-text/70! group-hover:[&_path]:fill-text!"
                    aria-hidden="true"
                  />
                )}
                <span className="text-nowrap font-medium text-base text-text/80 group-hover:text-text">
                  {provider.name}
                </span>
              </Container>
            </div>
          );
        })}
        {/* Duplicate set for seamless loop */}
        {providers.map((provider, index) => {
          const LogoComponent = provider.logo;
          return (
            <div
              key={`${provider.name}-second-${index}`}
              /* Fix: Increased mx-4 to mx-8 to match the first set */
              className="group z-10 mx-8 inline-flex shrink-0 transition-transform duration-300 hover:scale-105"
            >
              <Container
                roundedSize="3xl"
                className="flex flex-row items-center gap-4 px-5 py-4"
              >
                {LogoComponent && (
                  <LogoComponent
                    className="size-6 shrink-0 transition duration-300 [&_path]:fill-text/70! group-hover:[&_path]:fill-text!"
                    aria-hidden="true"
                  />
                )}
                <span className="text-nowrap font-medium text-base text-text/80 group-hover:text-text">
                  {provider.name}
                </span>
              </Container>
            </div>
          );
        })}
      </div>
    </div>
  );
};
