import { Code, type CodeLanguage } from '@intlayer/design-system/ide';
import { FileText, Globe, Link as LinkIcon } from 'lucide-react';
import type { FC, HTMLProps, ReactNode } from 'react';
import { memo } from 'react';
import { useIntlayer } from 'react-intlayer';
import { FieldItem } from './FieldItem';
import type { AuditDataList, MergedData } from './types';

type FieldItemData = {
  key: AuditDataList<string>;
  icon: ReactNode;
  label: ReactNode;
  description: ReactNode;
};

type AnalyzerPageResultsProps = {
  data: MergedData;
  url: string;
  isLoading?: boolean;
};

export const createCompOverwrite = (isDarkMode: boolean) => ({
  code: ({ className, children, ...props }: HTMLProps<HTMLElement>) => {
    const content = String(children ?? '').replace(/\n$/, '');
    const isBlock = !!className;

    if (!isBlock) {
      const decodedContent = content.replace(
        /&(?:amp;)?#(\d+);/g,
        (_, code: string) => String.fromCharCode(parseInt(code, 10))
      );
      return (
        <code className="rounded-md border border-neutral/30 bg-card/60 box-decoration-clone px-1.5 py-0.5 font-mono text-sm">
          {decodedContent}
        </code>
      );
    }

    return (
      <Code
        {...props}
        language={className?.replace('lang-', '') as CodeLanguage}
        showHeader={false}
        isDarkMode={isDarkMode}
      >
        {children as string}
      </Code>
    );
  },
  pre: ({ children }: HTMLProps<HTMLElement>) => <>{children}</>,
  // Use div instead of p to prevent block elements (code/pre/div) from nesting inside <p>
  p: ({ children }: HTMLProps<HTMLElement>) => (
    <div className="mb-2">{children}</div>
  ),
});

export const AnalyzerPageResults: FC<AnalyzerPageResultsProps> = memo(
  ({ data, url, isLoading }) => {
    const isDarkMode = true;
    const compOverwrite = createCompOverwrite(isDarkMode);
    const { fields, fieldsDescription } = useIntlayer('analyzer-results');

    const fieldsList: FieldItemData[] = [
      {
        key: `url_htmlLang\\${url}`,
        icon: <Globe size={16} />,
        label: fields.langTag,
        description: fieldsDescription.langTag.use(compOverwrite),
      },
      {
        key: `url_htmlDir\\${url}`,
        icon: <Globe size={16} />,
        label: fields.htmlDir,
        description: fieldsDescription.htmlDir.use(compOverwrite),
      },
      {
        key: `url_hreflang\\${url}`,
        icon: <FileText size={16} />,
        label: fields.hreflangs,
        description: fieldsDescription.hreflangs.use(compOverwrite),
      },
      {
        key: `url_hasXDefault\\${url}`,
        icon: <FileText size={16} />,
        label: fields.hasXDefault,
        description: fieldsDescription.hasXDefault.use(compOverwrite),
      },
      {
        key: `url_hasCanonical\\${url}`,
        icon: <LinkIcon size={16} />,
        label: fields.canonical,
        description: fieldsDescription.canonical.use(compOverwrite),
      },
      {
        key: `url_hasLocalizedLinks\\${url}`,
        icon: <LinkIcon size={16} />,
        label: fields.localizedLinks,
        description: fieldsDescription.localizedLinks.use(compOverwrite),
      },
      {
        key: `url_allAnchorsLocalized\\${url}`,
        icon: <LinkIcon size={16} />,
        label: fields.allAnchorsLocalized,
        description: fieldsDescription.allAnchorsLocalized.use(compOverwrite),
      },
    ];

    return (
      <div className="flex flex-col gap-2 pt-2 text-left text-sm">
        <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2 pt-2 sm:grid-cols-3">
          {fieldsList.map((item) => (
            <FieldItem
              key={item.key}
              id={item.key}
              icon={item.icon}
              details={item.description}
              label={item.label}
              event={data[item.key]}
              isLoading={isLoading}
            />
          ))}
        </div>
      </div>
    );
  }
);
