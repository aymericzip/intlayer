'use client';

import { Button, Loader } from '@intlayer/design-system';
import { useGetDictionaries } from '@intlayer/design-system/hooks';
import { useFocusDictionaryActions } from '@intlayer/editor-react';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useIntlayer } from 'next-intlayer';
import { FC } from 'react';
import { PagesRoutes } from '@/Routes';

type TagsDictionariesListProps = {
  tagKey: string;
};

const NoDictionaryView: FC = () => {
  const { noDictionaryView } = useIntlayer('tags-dictionaries-list');

  return (
    <div className="m-auto flex max-w-[400px] flex-col justify-center gap-2 p-6">
      <strong className="text-lg font-bold">{noDictionaryView.title}</strong>
      <p className="text-neutral dark:text-neutral-dark text-sm">
        {noDictionaryView.description}
      </p>
    </div>
  );
};

export const TagsDictionariesList: FC<TagsDictionariesListProps> = ({
  tagKey,
}) => {
  const router = useRouter();
  const { setFocusedContent } = useFocusDictionaryActions();
  const { dictionaryLinkLabel } = useIntlayer('tags-dictionaries-list');
  const { data, isWaitingData } = useGetDictionaries({
    args: {
      tags: [tagKey],
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Loader isLoading={isWaitingData}>
        {data?.data?.map((dictionary) => (
          <Button
            key={String(dictionary.key)}
            label={dictionaryLinkLabel.value}
            variant="hoverable"
            color="text"
            IconRight={ChevronRight}
            onClick={() => {
              setFocusedContent({
                dictionaryKey: dictionary.key,
                keyPath: [],
                dictionaryPath: dictionary.filePath,
              });
              router.push(`${PagesRoutes.Dashboard_Content}/${dictionary.key}`);
            }}
          >
            <div className="flex flex-col gap-2 p-2">
              {dictionary.title && (
                <strong className="text-wrap text-sm">
                  {dictionary.title}
                </strong>
              )}
              {dictionary.key && <span>{dictionary.key}</span>}
              {dictionary.description && (
                <span className="text-neutral dark:text-neutral-dark line-clamp-2 text-wrap">
                  {dictionary.description}
                </span>
              )}
            </div>
          </Button>
        ))}

        {data?.data?.length === 0 && <NoDictionaryView />}
      </Loader>
    </div>
  );
};
