import { type FC, type JSX, lazy, Suspense, type SVGProps } from 'react';
import { cn } from '../../utils/cn';
import type { TechLogoName } from './types';

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
  adonis: dynamicLogo(() => import('./logos/Adonis'), 'AdonisLogo'),
  angular: dynamicLogo(() => import('./logos/Angular'), 'AngularLogo'),
  astro: dynamicLogo(() => import('./logos/Astro'), 'AstroLogo'),
  express: dynamicLogo(() => import('./logos/Express'), 'ExpressLogo'),
  fastify: dynamicLogo(() => import('./logos/Fastify'), 'FastifyLogo'),
  hono: dynamicLogo(() => import('./logos/Hono'), 'HonoLogo'),
  lynx: dynamicLogo(() => import('./logos/Lynx'), 'LynxLogo'),
  nestjs: dynamicLogo(() => import('./logos/NestJS'), 'NestJSLogo'),
  nextjs: dynamicLogo(() => import('./logos/Nextjs'), 'NextJSLogo'),
  node: dynamicLogo(() => import('./logos/Node'), 'NodejsLogo'),
  nuxt: dynamicLogo(() => import('./logos/Nuxt'), 'NuxtLogo'),
  preact: dynamicLogo(() => import('./logos/Preact'), 'PreactLogo'),
  react: dynamicLogo(() => import('./logos/Reactjs'), 'ReactLogo'),
  solid: dynamicLogo(() => import('./logos/Solid'), 'SolidLogo'),
  svelte: dynamicLogo(() => import('./logos/Svelte'), 'SvelteLogo'),
  tanstack: dynamicLogo(() => import('./logos/Tanstack'), 'TanstackLogo'),
  vite: dynamicLogo(() => import('./logos/Vitejs'), 'ViteLogo'),
  vue: dynamicLogo(() => import('./logos/Vuejs'), 'VuejsLogo'),
  lit: dynamicLogo(() => import('./logos/Lit'), 'LitLogo'),
  vanilla: dynamicLogo(() => import('./logos/Vanilla'), 'JavaScriptLogo'),
  anthropic: dynamicLogo(() => import('./logos/Anthropic'), 'AnthropicLogo'),
  claude: dynamicLogo(() => import('./logos/Claude'), 'ClaudeLogo'),
  chatgpt: dynamicLogo(() => import('./logos/ChatGPT'), 'ChatGPTLogo'),
  deepseek: dynamicLogo(() => import('./logos/DeepSeek'), 'DeepSeekLogo'),
  gemini: dynamicLogo(() => import('./logos/Gemini'), 'GeminiLogo'),
  googleai: dynamicLogo(() => import('./logos/GoogleAI'), 'GoogleAILogo'),
  grok: dynamicLogo(() => import('./logos/Grok'), 'GrokLogo'),
  mistral: dynamicLogo(() => import('./logos/Mistral'), 'MistralLogo'),
  ollama: dynamicLogo(() => import('./logos/Ollama'), 'OllamaLogo'),
  openai: dynamicLogo(() => import('./logos/OpenAI'), 'OpenAILogo'),
  perplexity: dynamicLogo(() => import('./logos/Perplexity'), 'PerplexityLogo'),
  github: dynamicLogo(() => import('./logos/GitHub'), 'GitHubLogo'),
  gitlab: dynamicLogo(() => import('./logos/GitLab'), 'GitLabLogo'),
  bitbucket: dynamicLogo(() => import('./logos/Bitbucket'), 'BitbucketLogo'),
  google: dynamicLogo(() => import('./logos/Google'), 'GoogleLogo'),
  linkedin: dynamicLogo(() => import('./logos/LinkedIn'), 'LinkedInLogo'),
};

export const TechLogo: FC<TechLogoProps> = ({
  name,
  ...props
}): JSX.Element => {
  const LazyLogo = logoRecord[name as TechLogoName];

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
