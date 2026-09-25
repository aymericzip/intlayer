import { Container } from '@intlayer/design-system/container';
import { H4 } from '@intlayer/design-system/headers';
import {
  MarkDownIframe,
  MarkdownRenderer,
  type ParsedMarkdown,
} from '@intlayer/design-system/mark-down-render';
import { Website_Origin } from '@intlayer/design-system/routes';
import { Step, Steps } from '@intlayer/design-system/steps';
import {
  Children,
  type ComponentProps,
  type FC,
  isValidElement,
  lazy,
  type ReactNode,
} from 'react';
import { useLocale } from 'react-intlayer';
import type { FrameworkKey } from '~/components/I18nBenchmark';
import { Link } from '~/components/Link/Link';
import { TableOfContents } from '~/components/TableOfContents';
import { Accordion, AccordionGroup } from './AccordionGroup';
import { ClickToOpenIframe } from './ClickToOpenIframe';
import { FAQ, Question } from './FAQ';
import { SectionScroller } from './SectionScroller';
import { TechGrid, TechLink } from './TechLink';

export const preloadI18nBenchmark = () => import('~/components/I18nBenchmark');

const I18nBenchmark = lazy(() =>
  preloadI18nBenchmark().then((mod) => ({
    default: mod.I18nBenchmark,
  }))
);

/**
 * The origin the docs are written for, wherever it appears in an embed `src`
 * (`https://intlayer.org/…` as well as `origin=https://intlayer.org`).
 */
const AUTHORED_WEBSITE_ORIGIN_PATTERN =
  /https?:\/\/(localhost(:\d+)?|127\.0\.0\.1(:\d+)?|(www\.)?intlayer\.org)(?=[/?#&]|$)/g;

/**
 * Points an embed authored for intlayer.org at the origin this deployment
 * serves (e.g. intlayer.cn), so the frame stays same-site and mirrors do not
 * embed the main site.
 */
const toDeploymentOrigin = (src: string | undefined): string | undefined =>
  src?.replace(AUTHORED_WEBSITE_ORIGIN_PATTERN, Website_Origin);

type DocumentationRenderProps = {
  children: string | ParsedMarkdown;
  /**
   * Stylesheet resolving the classes of code blocks highlighted ahead of time,
   * as returned by the highlighting pass that produced the parsed markdown.
   */
  codeStyleSheet?: string;
  tocLevels?: number[];
  tocMaxDepth?: number;
};

const isDocOrBlogLink = (url: string | undefined): boolean => {
  if (!url || typeof url !== 'string') return false;
  return (
    url.includes('github.com/aymericzip/intlayer/blob/main/docs') ||
    url.startsWith('/doc') ||
    url.startsWith('/blog') ||
    url.startsWith('./') ||
    url.startsWith('../') ||
    /\.mdx?($|[?#])/i.test(url) ||
    /^\/([a-z]{2}(-[A-Z]{2})?)\/(doc|blog)/.test(url) ||
    /https?:\/\/(localhost(:\d+)?|127\.0\.0\.1(:\d+)?|(www\.)?intlayer\.org)(\/([a-z]{2}(-[A-Z]{2})?))?\/(doc|blog)/.test(
      url
    )
  );
};

const isConnectorText = (text: string): boolean => {
  const trimmed = text.trim();
  if (!trimmed) return true;
  return /^(and(\s+(the|a|in(\s+a)?|its))?|or|as\s+well\s+as|with|plus|et(\s+(le|la|les|l'|un|une|dans(\s+un)?))?|ainsi\s+que|ou|avec|y(\s+(el|la|los|las))?|e|und(\s+(das|die|der|ein))?|oder|[,;&+/•|.-]|\s+)+$/i.test(
    trimmed
  );
};

type DocLinkItem = { href: string; title: ReactNode };

const extractDocLinksFromNode = (node: ReactNode): DocLinkItem[] | null => {
  if (!isValidElement(node)) return null;

  const links: DocLinkItem[] = [];
  let hasSubstantiveText = false;

  const traverse = (current: ReactNode): void => {
    if (current == null || typeof current === 'boolean') return;

    if (typeof current === 'string' || typeof current === 'number') {
      const str = String(current).trim();
      if (str.length > 0 && !isConnectorText(str)) {
        hasSubstantiveText = true;
      }
      return;
    }

    if (isValidElement(current)) {
      const props = current.props as any;
      if (props?.href) {
        if (isDocOrBlogLink(props.href)) {
          const cleanHref =
            typeof props.href === 'string'
              ? props.href.replace(AUTHORED_WEBSITE_ORIGIN_PATTERN, '')
              : props.href;
          links.push({
            href: cleanHref,
            title: props.children,
          });
        } else {
          hasSubstantiveText = true;
        }
        return;
      }

      Children.forEach(props?.children, traverse);
    }
  };

  traverse(node);

  if (hasSubstantiveText || links.length === 0) {
    return null;
  }

  return links;
};

const extractLinksFromParagraph = (
  children: ReactNode
): DocLinkItem[] | null => {
  const items: DocLinkItem[] = [];
  let onlyDocLinks = true;

  Children.forEach(children, (child) => {
    if (typeof child === 'string') {
      if (child.trim().length > 0 && !isConnectorText(child)) {
        onlyDocLinks = false;
      }
      return;
    }
    if (isValidElement(child)) {
      const links = extractDocLinksFromNode(child);
      if (links && links.length > 0) {
        items.push(...links);
      } else {
        onlyDocLinks = false;
      }
    }
  });

  return onlyDocLinks && items.length > 1 ? items : null;
};

export const DocumentationRender: FC<DocumentationRenderProps> = ({
  children,
  codeStyleSheet,
  tocLevels = [2, 3],
  tocMaxDepth = 3,
}) => {
  const { locale } = useLocale();

  return (
    <div className="m-auto flex max-w-3xl flex-col gap-8 p-4 text-foreground/90 max-md:px-0">
      {codeStyleSheet && (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: generated by Shiki from a fixed pair of themes
        <style dangerouslySetInnerHTML={{ __html: codeStyleSheet }} />
      )}
      <MarkdownRenderer
        locale={locale}
        components={{
          script: () => null,
          a: ({ color, ...props }: ComponentProps<'a'>) => {
            const rawHref = props.href ?? '';
            const to =
              typeof rawHref === 'string'
                ? rawHref.replace(AUTHORED_WEBSITE_ORIGIN_PATTERN, '')
                : rawHref;

            const label =
              typeof props.children === 'string'
                ? props.children
                : (props['aria-label'] ?? '');

            return (
              <Link
                label={label}
                underlined={true}
                locale={locale}
                {...props}
                to={to}
              />
            );
          },
          p: (props: ComponentProps<'p'>) => {
            const docLinks = extractLinksFromParagraph(props.children);
            if (docLinks) {
              return (
                <TechGrid>
                  {docLinks.map((item, idx) => (
                    <TechLink
                      key={item.href || idx}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </TechGrid>
              );
            }
            return <p {...props} />;
          },
          ul: (props: ComponentProps<'ul'>) => {
            const items: DocLinkItem[] = [];
            let allDocLinks = true;

            Children.forEach(props.children, (li) => {
              if (!isValidElement(li)) {
                if (typeof li === 'string' && li.trim().length > 0) {
                  allDocLinks = false;
                }
                return;
              }
              const links = extractDocLinksFromNode(li);
              if (links && links.length > 0) {
                items.push(...links);
              } else {
                allDocLinks = false;
              }
            });

            if (allDocLinks && items.length > 0) {
              return (
                <TechGrid>
                  {items.map((item, idx) => (
                    <TechLink
                      key={item.href || idx}
                      href={item.href}
                      title={item.title}
                    />
                  ))}
                </TechGrid>
              );
            }

            return <ul {...props} />;
          },
          Toc: (props: ComponentProps<typeof TableOfContents>) => (
            <TableOfContents
              {...props}
              levels={props.levels ?? tocLevels}
              maxDepth={props.maxDepth ?? tocMaxDepth}
            />
          ),
          I18nBenchmark: (props: { framework?: FrameworkKey }) => (
            <I18nBenchmark initialFramework={props.framework} />
          ),
          Sponsor: ({ children, ...props }: ComponentProps<'div'>) => (
            <Container
              background="none"
              transparency="xs"
              border
              borderColor="neutral"
              padding="lg"
              roundedSize="2xl"
              {...props}
            >
              <H4 className="mb-4 text-text/80">Sponsor</H4>
              <div className="text-sm text-text/80">{children}</div>
            </Container>
          ),
          iframe: ({ src, ...props }: ComponentProps<'iframe'>) => (
            <MarkDownIframe {...props} src={toDeploymentOrigin(src)} />
          ),
          ClickToOpenIframe: ({ src, ...props }: ComponentProps<'iframe'>) => (
            <ClickToOpenIframe {...props} src={toDeploymentOrigin(src)} />
          ),
          Step,
          Steps,
          Accordion,
          AccordionGroup,
          FAQ,
          Question,
          TechLink,
          TechCard: TechLink,
          TechGrid,
          TechList: TechGrid,
          TechLinks: TechGrid,
        }}
        wrapper={(props) => (
          <>
            <SectionScroller />
            <div
              className="flex flex-col gap-8 py-10 text-text/65"
              {...props}
            />
          </>
        )}
      >
        {children}
      </MarkdownRenderer>
    </div>
  );
};
