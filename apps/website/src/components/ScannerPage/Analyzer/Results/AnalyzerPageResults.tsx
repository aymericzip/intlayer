'use client';

import { Link } from '@components/Link/Link';
import { Code, type CodeLanguage } from '@intlayer/design-system';
import { FileText, Globe, Link as LinkIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import { useTheme } from 'next-themes';
import type { FC, HTMLProps, ReactNode } from 'react';
import { memo } from 'react';
import { BundleContentField } from './BundleContentField';
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
  code: ({ className, children, ...props }: HTMLProps<HTMLElement>) => (
    <Code
      {...props}
      language={className?.replace('lang-', '') as CodeLanguage}
      showHeader={false}
      isDarkMode={isDarkMode}
    >
      {children as string}
    </Code>
  ),
});

export const AnalyzerPageResults: FC<AnalyzerPageResultsProps> = memo(
  ({ data, url, isLoading }) => {
    const { resolvedTheme } = useTheme();
    const isDarkMode = resolvedTheme === 'dark';
    const compOverwrite = createCompOverwrite(isDarkMode);
    const {
      fields,
      fieldsDescription,
      url: urlText,
    } = useIntlayer('analyzer-results');
    const bundleKey =
      `url_unusedBundleContent\\${url}` as AuditDataList<string>;

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
        <Link href={url} label={urlText.label.value} color="text">
          {url}
        </Link>
        <div className="mt-3 grid grid-cols-1 xs:grid-cols-2 gap-x-4 gap-y-2 border-neutral border-t border-dashed pt-2 sm:grid-cols-3">
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
          <BundleContentField
            id={bundleKey}
            label={fields.unusedBundleContent}
            description={fieldsDescription.unusedBundleContent.use(
              compOverwrite
            )}
            event={data[bundleKey]}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
);
