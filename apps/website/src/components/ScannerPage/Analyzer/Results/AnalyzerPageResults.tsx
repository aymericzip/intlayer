'use client';

import { Link } from '@components/Link/Link';
import { FileText, Globe, Link as LinkIcon } from 'lucide-react';
import { useIntlayer } from 'next-intlayer';
import type { FC, ReactNode } from 'react';
import { memo } from 'react';
import { FieldItem } from './FieldItem';
import type { AuditDataList, MergedData } from './types';

type FieldItemData = {
  key: AuditDataList<string>;
  icon: ReactNode;
  label: string;
  description: string;
};

type AnalyzerPageResultsProps = {
  data: MergedData;
  url: string;
  isLoading?: boolean;
};

export const AnalyzerPageResults: FC<AnalyzerPageResultsProps> = memo(
  ({ data, url, isLoading }) => {
    const {
      fields,
      fieldsDescription,
      url: urlText,
    } = useIntlayer('analyzer-results');

    const fieldsList: FieldItemData[] = [
      {
        key: `url_htmlLang\\${url}`,
        icon: <Globe size={16} />,
        label: fields.langTag,
        description: fieldsDescription.langTag,
      },
      {
        key: `url_htmlDir\\${url}`,
        icon: <Globe size={16} />,
        label: fields.htmlDir,
        description: fieldsDescription.htmlDir,
      },
      {
        key: `url_hreflang\\${url}`,
        icon: <FileText size={16} />,
        label: fields.hreflangs,
        description: fieldsDescription.hreflangs,
      },
      {
        key: `url_hasXDefault\\${url}`,
        icon: <FileText size={16} />,
        label: fields.hasXDefault,
        description: fieldsDescription.hasXDefault,
      },
      {
        key: `url_hasCanonical\\${url}`,
        icon: <LinkIcon size={16} />,
        label: fields.canonical,
        description: fieldsDescription.canonical,
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
        </div>
      </div>
    );
  }
);
