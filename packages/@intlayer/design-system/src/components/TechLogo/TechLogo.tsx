import { type FC, type JSX, lazy, Suspense, type SVGProps } from 'react';
import { cn } from '../../utils/cn';
import { TechLogoName } from './types';

export type TechLogoProps = SVGProps<SVGSVGElement> & {
  name: TechLogoName;
};

/**
 * This ensures React.lazy always receives a valid component.
 */
const dynamicLogo = (importFn: () => Promise<any>, exportName: string) =>
  lazy(async () => {
    const module = await importFn();
    const asset = module[exportName];

    return { default: asset };
  });

const logoRecord: Record<TechLogoName, ReturnType<typeof dynamicLogo>> = {
  [TechLogoName.Adonis]: dynamicLogo(
    () => import('./logos/Adonis'),
    'AdonisLogo'
  ),
  [TechLogoName.Angular]: dynamicLogo(
    () => import('./logos/Angular'),
    'AngularLogo'
  ),
  [TechLogoName.Astro]: dynamicLogo(() => import('./logos/Astro'), 'AstroLogo'),
  [TechLogoName.Express]: dynamicLogo(
    () => import('./logos/Express'),
    'ExpressLogo'
  ),
  [TechLogoName.Fastify]: dynamicLogo(
    () => import('./logos/Fastify'),
    'FastifyLogo'
  ),
  [TechLogoName.Hono]: dynamicLogo(() => import('./logos/Hono'), 'HonoLogo'),
  [TechLogoName.Lynx]: dynamicLogo(() => import('./logos/Lynx'), 'LynxLogo'),
  [TechLogoName.NestJS]: dynamicLogo(
    () => import('./logos/NestJS'),
    'NestJSLogo'
  ),
  [TechLogoName.Nextjs]: dynamicLogo(
    () => import('./logos/Nextjs'),
    'NextJSLogo'
  ),
  [TechLogoName.Node]: dynamicLogo(() => import('./logos/Node'), 'NodejsLogo'),
  [TechLogoName.Nuxt]: dynamicLogo(() => import('./logos/Nuxt'), 'NuxtLogo'),
  [TechLogoName.Preact]: dynamicLogo(
    () => import('./logos/Preact'),
    'PreactLogo'
  ),
  [TechLogoName.React]: dynamicLogo(
    () => import('./logos/Reactjs'),
    'ReactLogo'
  ),
  [TechLogoName.Solid]: dynamicLogo(() => import('./logos/Solid'), 'SolidLogo'),
  [TechLogoName.Svelte]: dynamicLogo(
    () => import('./logos/Svelte'),
    'SvelteLogo'
  ),
  [TechLogoName.Tanstack]: dynamicLogo(
    () => import('./logos/Tanstack'),
    'TanstackLogo'
  ),
  [TechLogoName.Vite]: dynamicLogo(() => import('./logos/Vitejs'), 'ViteLogo'),
  [TechLogoName.Vue]: dynamicLogo(() => import('./logos/Vuejs'), 'VuejsLogo'),
  [TechLogoName.Lit]: dynamicLogo(() => import('./logos/Lit'), 'LitLogo'),
  [TechLogoName.Vanilla]: dynamicLogo(
    () => import('./logos/Vanilla'),
    'JavaScriptLogo'
  ),
  [TechLogoName.Anthropic]: dynamicLogo(
    () => import('./logos/Anthropic'),
    'AnthropicLogo'
  ),
  [TechLogoName.Claude]: dynamicLogo(
    () => import('./logos/Claude'),
    'ClaudeLogo'
  ),
  [TechLogoName.ChatGPT]: dynamicLogo(
    () => import('./logos/ChatGPT'),
    'ChatGPTLogo'
  ),
  [TechLogoName.DeepSeek]: dynamicLogo(
    () => import('./logos/DeepSeek'),
    'DeepSeekLogo'
  ),
  [TechLogoName.Gemini]: dynamicLogo(
    () => import('./logos/Gemini'),
    'GeminiLogo'
  ),
  [TechLogoName.GoogleAI]: dynamicLogo(
    () => import('./logos/GoogleAI'),
    'GoogleAILogo'
  ),
  [TechLogoName.Grok]: dynamicLogo(() => import('./logos/Grok'), 'GrokLogo'),
  [TechLogoName.Mistral]: dynamicLogo(
    () => import('./logos/Mistral'),
    'MistralLogo'
  ),
  [TechLogoName.Ollama]: dynamicLogo(
    () => import('./logos/Ollama'),
    'OllamaLogo'
  ),
  [TechLogoName.OpenAI]: dynamicLogo(
    () => import('./logos/OpenAI'),
    'OpenAILogo'
  ),
  [TechLogoName.Perplexity]: dynamicLogo(
    () => import('./logos/Perplexity'),
    'PerplexityLogo'
  ),
};

export const TechLogo: FC<TechLogoProps> = ({
  name,
  ...props
}): JSX.Element => {
  const LazyLogo = logoRecord[name];

  if (!LazyLogo) {
    return <></>;
  }

  return (
    <Suspense
      fallback={
        <div className={cn('animate-pulse bg-neutral-200', props.className)} />
      }
    >
      <LazyLogo {...(props as any)} />
    </Suspense>
  );
};
