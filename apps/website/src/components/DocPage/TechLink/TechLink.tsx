import { Container } from '@intlayer/design-system/container';
import { TechLogo, type TechLogoName } from '@intlayer/design-system/tech-logo';
import { cn } from '@intlayer/design-system/utils';
import type { DocMetadata } from '@intlayer/docs';
import { getIntlayer } from 'intlayer';
import { ChevronRight, Terminal } from 'lucide-react';
import {
  Children,
  type FC,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
  useMemo,
} from 'react';
import { useLocale } from 'react-intlayer';
import { Link } from '~/components/Link/Link';
import { getDocData } from '../docData';
import type { Section } from '../types';

export type TechLinkProps = {
  /**
   * The tech logo identifier (e.g. 'nextjs', 'react', 'vite', 'astro', etc.)
   * Can also be an array of tech logos (e.g. ['astro', 'react'])
   * or a comma/plus-separated string (e.g. 'astro + react')
   */
  tech?: TechLogoName | string | (TechLogoName | string)[];
  logo?: TechLogoName | string | (TechLogoName | string)[];
  framework?: TechLogoName | string | (TechLogoName | string)[];
  frameworks?: (TechLogoName | string)[];

  /** Link target (URL, relative path, or GitHub doc URL) */
  href?: string;
  to?: string;

  /** Key or path to doc (e.g. './docs/en/intlayer_with_nextjs_16.md' or 'intlayer_with_nextjs_16') */
  doc?: string;

  /** Title of the technology / guide */
  title?: ReactNode;

  /** Description text */
  description?: ReactNode;

  /** Custom children (can replace or augment description) */
  children?: ReactNode;

  /** Custom icon override (if provided, rendered instead of TechLogo) */
  icon?: ReactNode;

  /** Additional CSS classes */
  className?: string;
};

const normalizeSingleTechLogo = (tech: string): TechLogoName | undefined => {
  if (!tech) return undefined;
  const t = tech.toLowerCase().trim();

  const directMap: Record<string, TechLogoName> = {
    adonis: 'adonis',
    adonisjs: 'adonis',
    analog: 'angular',
    angular: 'angular',
    anthropic: 'anthropic',
    astro: 'astro',
    atlassian: 'atlassian' as any,
    bitbucket: 'bitbucket',
    chatgpt: 'chatgpt',
    claude: 'claude',
    cra: 'react',
    deepseek: 'deepseek',
    elysia: 'elysia',
    expo: 'react',
    express: 'express',
    fastify: 'fastify',
    gemini: 'gemini',
    github: 'github',
    gitlab: 'gitlab',
    google: 'google',
    googleai: 'googleai',
    grok: 'grok',
    hono: 'hono',
    htmx: 'htmx',
    i18next: 'vanilla',
    'i18n-js': 'vanilla',
    javascript: 'vanilla',
    js: 'vanilla',
    linkedin: 'linkedin',
    lit: 'lit',
    lynx: 'lynx',
    mistral: 'mistral',
    nest: 'nestjs',
    nestjs: 'nestjs',
    next: 'nextjs',
    nextjs: 'nextjs',
    'next-js': 'nextjs',
    'next.js': 'nextjs',
    'next-intl': 'nextjs',
    'next-i18next': 'nextjs',
    'next-translate': 'nextjs',
    node: 'node',
    nodejs: 'node',
    nuxt: 'nuxt',
    nuxtjs: 'nuxt',
    'nuxtjs-i18n': 'nuxt',
    ollama: 'ollama',
    openai: 'openai',
    perplexity: 'perplexity',
    polyglot: 'vanilla',
    'polyglot.js': 'vanilla',
    preact: 'preact',
    react: 'react',
    reactjs: 'react',
    'react-native': 'react',
    'react-router': 'react',
    'react-i18next': 'react',
    'react-intl': 'react',
    remix: 'remix',
    solid: 'solid',
    solidjs: 'solid',
    solidstart: 'solid',
    'solid-start': 'solid',
    storybook: 'react',
    svelte: 'svelte',
    'svelte-i18n': 'svelte',
    sveltekit: 'svelte',
    'svelte-kit': 'svelte',
    tanstack: 'tanstack',
    'tanstack-start': 'tanstack',
    transloco: 'angular',
    vanilla: 'vanilla',
    vanillajs: 'vanilla',
    vite: 'vite',
    vitejs: 'vite',
    vue: 'vue',
    vuejs: 'vue',
    'vue-i18n': 'vue',
    lingui: 'react',
    'ngx-translate': 'angular',
    ngx: 'angular',
  };

  if (directMap[t]) return directMap[t];

  if (
    /(^|[^a-z0-9]|_)react([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)expo([.-]|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)cra([.-]|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)lynx([.-]|js|\b|_)/i.test(t)
  ) {
    if (/(^|[^a-z0-9]|_)lynx([.-]|js|\b|_)/i.test(t)) return 'lynx';
    return 'react';
  }

  // Next.js: match 'nextjs', 'next.js', 'next-intl', 'next-i18next', 'next-...' or standalone 'next'
  // But NOT 'i18next' where 'next' is preceded by 'i18' or '18'
  if (/(^|[^a-z0-9]|_)next([.-]|js|\b|_)/i.test(t)) return 'nextjs';
  if (/(^|[^a-z0-9]|_)nuxt([.-]|js|\b|_)/i.test(t)) return 'nuxt';
  if (/(^|[^a-z0-9]|_)tanstack([.-]|js|\b|_)/i.test(t)) return 'tanstack';
  if (/(^|[^a-z0-9]|_)solid([.-]|js|start|\b|_)/i.test(t)) return 'solid';
  if (/(^|[^a-z0-9]|_)svelte([.-]|js|kit|\b|_)/i.test(t)) return 'svelte';
  if (/(^|[^a-z0-9]|_)astro([.-]|js|\b|_)/i.test(t)) return 'astro';
  if (
    /(^|[^a-z0-9]|_)angular([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)analog([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)transloco([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)ngx([.-]|\b|_)/i.test(t)
  ) {
    return 'angular';
  }
  if (/(^|[^a-z0-9]|_)preact([.-]|js|\b|_)/i.test(t)) return 'preact';
  if (/(^|[^a-z0-9]|_)vue([.-]|js|\b|_)/i.test(t)) return 'vue';
  if (/(^|[^a-z0-9]|_)vite([.-]|js|\b|_)/i.test(t)) return 'vite';
  if (/(^|[^a-z0-9]|_)remix([.-]|js|\b|_)/i.test(t)) return 'remix';
  if (/(^|[^a-z0-9]|_)express([.-]|js|\b|_)/i.test(t)) return 'express';
  if (/(^|[^a-z0-9]|_)nest(js|[.-]|\b|_)/i.test(t)) return 'nestjs';
  if (/(^|[^a-z0-9]|_)fastify([.-]|js|\b|_)/i.test(t)) return 'fastify';
  if (/(^|[^a-z0-9]|_)hono([.-]|js|\b|_)/i.test(t)) return 'hono';
  if (/(^|[^a-z0-9]|_)elysia([.-]|js|\b|_)/i.test(t)) return 'elysia';
  if (/(^|[^a-z0-9]|_)adonis([.-]|js|\b|_)/i.test(t)) return 'adonis';
  if (/(^|[^a-z0-9]|_)lit([.-]|js|\b|_)/i.test(t)) return 'lit';
  if (/(^|[^a-z0-9]|_)htmx([.-]|js|\b|_)/i.test(t)) return 'htmx';
  if (
    /(^|[^a-z0-9]|_)polyglot([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)i18n-js([.-]|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)i18next([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)vanilla([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)javascript([.-]|js|\b|_)/i.test(t) ||
    /(^|[^a-z0-9]|_)js([.-]|\b|_)/i.test(t)
  ) {
    return 'vanilla';
  }
  if (/(^|[^a-z0-9]|_)node([.-]|js|\b|_)/i.test(t)) return 'node';

  return undefined;
};

export const normalizeTechLogos = (
  input?: TechLogoName | string | (TechLogoName | string)[]
): TechLogoName[] => {
  if (!input) return [];
  const rawList: string[] = Array.isArray(input)
    ? input
    : typeof input === 'string'
      ? input.split(/[,+]/)
      : [String(input)];

  const seen = new Set<TechLogoName>();
  const result: TechLogoName[] = [];

  for (const item of rawList) {
    const normalized = normalizeSingleTechLogo(item);
    if (normalized && !seen.has(normalized)) {
      seen.add(normalized);
      result.push(normalized);
    }
  }

  return result;
};

const getStringValue = (val: any): string | undefined => {
  if (!val) return undefined;
  if (typeof val === 'string') return val;
  if (typeof val?.value === 'string') return val.value;
  return typeof val === 'object' ? undefined : String(val);
};

const findMatchingDoc = (
  allDocs: DocMetadata[],
  target: string
): DocMetadata | undefined => {
  if (!target || !Array.isArray(allDocs)) return undefined;
  const cleanTarget = target.trim();
  const cleanTargetNoExt = cleanTarget.replace(/\.(md|mdx)$/, '');

  // Direct matches
  const direct = allDocs.find((d) => {
    if (!d) return false;
    const docKey = getStringValue(d.docKey);
    const githubUrl = getStringValue(d.githubUrl);
    const relativeUrl = getStringValue(d.relativeUrl);
    const url = getStringValue(d.url);

    return (
      docKey === cleanTarget ||
      docKey?.replace(/\.(md|mdx)$/, '') === cleanTargetNoExt ||
      githubUrl === cleanTarget ||
      githubUrl?.replace(/\.(md|mdx)$/, '') === cleanTargetNoExt ||
      relativeUrl === cleanTarget ||
      url === cleanTarget
    );
  });
  if (direct) return direct;

  // Extract base filename without extension
  const targetFile = cleanTarget
    .split('/')
    .pop()
    ?.replace(/\.(md|mdx)$/, '');
  if (!targetFile) return undefined;

  const targetFileNorm = targetFile.replace(/-/g, '_');

  return allDocs.find((d) => {
    if (!d) return false;
    const docKey = getStringValue(d.docKey);
    if (docKey) {
      const docFile = docKey
        .split('/')
        .pop()
        ?.replace(/\.(md|mdx)$/, '');
      if (
        docFile &&
        (docFile === targetFile ||
          docFile.replace(/-/g, '_') === targetFileNorm)
      ) {
        return true;
      }
    }

    const slugs = d.slugs;
    if (Array.isArray(slugs) && slugs.length > 0) {
      const lastSlug = getStringValue(slugs[slugs.length - 1]);
      if (
        lastSlug &&
        (lastSlug === targetFile ||
          lastSlug.replace(/-/g, '_') === targetFileNorm)
      ) {
        return true;
      }
    }

    return false;
  });
};

type DocDataEntry = {
  title: string;
  frameworks?: string[];
  relativeUrl?: string;
  url?: string;
  docKey?: string;
};

const findDocDataEntry = (
  section: Section,
  target: string,
  docKey?: string
): DocDataEntry | undefined => {
  if (!section || typeof section !== 'object') return undefined;

  const cleanTarget = target
    .split('/')
    .pop()
    ?.replace(/\.(md|mdx)$/, '');
  const cleanDocKey = docKey
    ?.split('/')
    .pop()
    ?.replace(/\.(md|mdx)$/, '');

  let found: DocDataEntry | undefined;

  const traverse = (node: any, inheritedFrameworks?: string[]) => {
    if (found || !node || typeof node !== 'object') return;

    const rawFrameworks = node.frameworks ?? inheritedFrameworks;
    const frameworks = Array.isArray(rawFrameworks)
      ? rawFrameworks.map(getStringValue).filter((f): f is string => Boolean(f))
      : undefined;

    if (node.default) {
      const def = node.default;
      const defKey =
        getStringValue(def.docKey) || getStringValue(def.relativeUrl) || '';
      const defFile = defKey
        .split('/')
        .pop()
        ?.replace(/\.(md|mdx)$/, '');

      const defRel = getStringValue(def.relativeUrl);
      const defUrl = getStringValue(def.url);
      const defDocKey = getStringValue(def.docKey);

      if (
        (cleanTarget && defFile === cleanTarget) ||
        (cleanDocKey && defFile === cleanDocKey) ||
        (defRel && defRel === target) ||
        (defUrl && defUrl === target) ||
        (defDocKey && defDocKey === target)
      ) {
        found = {
          title: getStringValue(node.title) ?? getStringValue(def.title) ?? '',
          frameworks,
          relativeUrl: defRel,
          url: defUrl,
          docKey: defDocKey,
        };
        return;
      }
    }

    if (node.subSections && typeof node.subSections === 'object') {
      for (const subNode of Object.values(node.subSections)) {
        traverse(subNode, frameworks);
      }
    }
  };

  traverse(section);
  return found;
};

const filterAutoFrameworks = (
  frameworks: string[],
  titleStr?: string
): TechLogoName[] => {
  const resolved = frameworks
    .map(normalizeSingleTechLogo)
    .filter((f): f is TechLogoName => Boolean(f));

  if (resolved.length <= 1) return resolved;

  const titleLower = (titleStr || '').toLowerCase();
  const isMulti =
    titleLower.includes('and') ||
    titleLower.includes('+') ||
    titleLower.includes('with') ||
    titleLower.includes('et') ||
    titleLower.includes('und') ||
    titleLower.includes('y');

  if (isMulti) {
    return resolved.slice(0, 2);
  }

  return [resolved[0]];
};

export const TechLink: FC<TechLinkProps> = ({
  tech,
  logo,
  framework,
  frameworks: frameworksProp,
  href,
  to,
  doc,
  title,
  description,
  children,
  icon,
  className,
}) => {
  const { locale } = useLocale();
  const rawTarget = to ?? href ?? doc ?? '';

  const docMeta = useMemo(() => {
    if (!rawTarget) return undefined;
    try {
      const docMetadata = (getIntlayer('doc-metadata', locale) ??
        []) as DocMetadata[];
      const blogMetadata = (getIntlayer('blog-metadata', locale) ??
        []) as DocMetadata[];
      const allDocs = [...docMetadata, ...blogMetadata];
      if (Array.isArray(allDocs)) {
        return findMatchingDoc(allDocs, rawTarget);
      }
      return undefined;
    } catch {
      return undefined;
    }
  }, [rawTarget, locale]);

  const docDataEntry = useMemo(() => {
    if (!rawTarget && !docMeta) return undefined;
    try {
      const docData = getDocData(locale);
      if (docData && typeof docData === 'object') {
        const docKey = getStringValue(docMeta?.docKey);
        return findDocDataEntry(docData, rawTarget, docKey);
      }
      return undefined;
    } catch {
      return undefined;
    }
  }, [rawTarget, docMeta, locale]);

  const displayTitle = useMemo(() => {
    if (title) return title;
    if (children && !description) return children;
    const dataTitle = getStringValue(docDataEntry?.title);
    if (dataTitle) return dataTitle;
    const metaTitle = getStringValue(docMeta?.title);
    if (metaTitle) return metaTitle;
    return (
      rawTarget
        .split('/')
        .pop()
        ?.replace(/\.(md|mdx)$/, '') || 'Guide'
    );
  }, [title, children, description, docDataEntry, docMeta, rawTarget]);

  const displayDescription = useMemo(() => {
    if (description) return description;
    if (children && title && children !== title) return children;
    const metaDesc = getStringValue(docMeta?.description);
    if (metaDesc) return metaDesc;
    return undefined;
  }, [description, children, docMeta, title]);

  const resolvedLogos = useMemo<TechLogoName[]>(() => {
    const explicit = tech ?? logo ?? framework ?? frameworksProp;
    if (explicit) {
      return normalizeTechLogos(explicit);
    }
    if (docDataEntry?.frameworks?.length) {
      const titleStr = typeof displayTitle === 'string' ? displayTitle : '';
      return filterAutoFrameworks(docDataEntry.frameworks, titleStr);
    }
    if (rawTarget) {
      const targetIdentifier = rawTarget
        .split('?')[0]
        .split('#')[0]
        .split('/')
        .filter(Boolean)
        .pop()
        ?.replace(/\.(md|mdx)$/, '');

      if (targetIdentifier) {
        const detectedFromId = normalizeSingleTechLogo(targetIdentifier);
        if (detectedFromId) return [detectedFromId];
      }

      const detected = normalizeSingleTechLogo(rawTarget);
      if (detected) return [detected];
    }
    if (docMeta?.slugs && Array.isArray(docMeta.slugs)) {
      for (let i = docMeta.slugs.length - 1; i >= 0; i--) {
        const slug = getStringValue(docMeta.slugs[i]);
        if (slug) {
          const detectedSlug = normalizeSingleTechLogo(slug);
          if (detectedSlug) return [detectedSlug];
        }
      }
    }
    if (typeof displayTitle === 'string' && displayTitle) {
      const detected = normalizeSingleTechLogo(displayTitle);
      if (detected) return [detected];
    }
    return [];
  }, [
    tech,
    logo,
    framework,
    frameworksProp,
    docDataEntry,
    rawTarget,
    docMeta,
    displayTitle,
  ]);

  const resolvedHref =
    to ??
    getStringValue(docMeta?.relativeUrl) ??
    docDataEntry?.relativeUrl ??
    href;

  const isCli = useMemo(() => {
    if (rawTarget?.includes('/cli') || rawTarget?.includes('cli/')) return true;
    const slugs = docMeta?.slugs;
    if (
      Array.isArray(slugs) &&
      slugs.some((s) => getStringValue(s)?.toLowerCase() === 'cli')
    ) {
      return true;
    }
    return false;
  }, [rawTarget, docMeta]);

  const hasIcon = Boolean(icon || resolvedLogos.length > 0 || isCli);

  const content = (
    <Container
      roundedSize="2xl"
      border
      borderColor="neutral"
      background="hoverable"
      transparency="md"
      padding="md"
      className={cn(
        'group/tech-link flex h-full w-full min-w-60 flex-row items-center gap-4 transition-all duration-200 hover:border-neutral-focus hover:shadow-xs max-sm:min-w-full',
        className
      )}
    >
      {hasIcon && (
        <div className="flex size-10 shrink-0 items-center justify-center p-2 md:size-12">
          {icon ? (
            icon
          ) : resolvedLogos.length === 1 ? (
            <TechLogo
              name={resolvedLogos[0]}
              className="size-6 shrink-0 md:size-7"
            />
          ) : resolvedLogos.length > 1 ? (
            <div className="flex shrink-0 items-center -space-x-2">
              {resolvedLogos.slice(0, 2).map((logoName, idx) => (
                <TechLogo
                  key={logoName}
                  name={logoName}
                  className={cn(
                    'size-5 shrink-0 md:size-6',
                    idx === 0 ? 'z-10' : 'z-0'
                  )}
                />
              ))}
            </div>
          ) : isCli ? (
            <div className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-neutral-500/10 text-neutral-600 md:size-7 dark:text-neutral-400">
              <Terminal className="size-3.5 shrink-0 md:size-4" />
            </div>
          ) : null}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <span className="line-clamp-2 font-semibold text-foreground text-sm leading-snug transition-colors group-hover/tech-link:text-primary md:text-base">
          {displayTitle}
        </span>
        {displayDescription && (
          <span className="line-clamp-2 text-text/70 text-xs leading-relaxed md:text-sm">
            {displayDescription}
          </span>
        )}
      </div>

      <ChevronRight className="ml-auto size-4 shrink-0 text-text/40 transition-all group-hover/tech-link:translate-x-0.5 group-hover/tech-link:text-primary" />
    </Container>
  );

  if (resolvedHref) {
    return (
      <Link
        to={resolvedHref}
        variant="invisible-link"
        underlined={false}
        className="group not-prose block min-w-60 flex-1 no-underline max-sm:min-w-full"
        label={
          typeof displayTitle === 'string' && displayTitle
            ? displayTitle
            : rawTarget || 'Guide'
        }
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="not-prose min-w-60 flex-1 max-sm:min-w-full">{content}</div>
  );
};

export type TechGridProps = PropsWithChildren<{
  className?: string;
  items?: TechLinkProps[];
}>;

export const TechGrid: FC<TechGridProps> = ({ children, className, items }) => {
  const renderedChildren = useMemo(() => {
    if (!children) return null;

    const extractLinks = (nodes: ReactNode): ReactNode[] => {
      const result: ReactNode[] = [];
      Children.forEach(nodes, (child) => {
        if (!isValidElement(child)) return;

        // If it's a list (<ul> or <ol>) or list item (<li>), unwrap recursively
        const typeStr =
          typeof child.type === 'string'
            ? child.type
            : (child.props as any)?.originalType;

        if (typeStr === 'ul' || typeStr === 'ol' || typeStr === 'li') {
          result.push(...extractLinks((child.props as any).children));
          return;
        }

        // If it's an <a> or <Link> or has href/to
        const { children: linkChildren, ...restProps } = (child.props ??
          {}) as any;
        const href = restProps.href ?? restProps.to;
        if (href && child.type !== TechLink) {
          result.push(
            <TechLink
              key={href}
              href={href}
              title={restProps.title ?? linkChildren}
              {...restProps}
            />
          );
          return;
        }

        result.push(child);
      });
      return result;
    };

    return extractLinks(children);
  }, [children]);

  return (
    <div
      className={cn('not-prose my-4 flex flex-wrap gap-x-3 gap-y-2', className)}
    >
      {items
        ? items.map((item, idx) => (
            <TechLink
              key={
                item.to ??
                item.href ??
                item.doc ??
                (typeof item.title === 'string' ? item.title : idx)
              }
              {...item}
            />
          ))
        : renderedChildren}
    </div>
  );
};
