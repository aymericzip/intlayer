'use client';

import { Link } from '@components/Link/Link';
import { Loader } from '@intlayer/design-system';
import { useGetDictionaries } from '@intlayer/design-system/hooks';
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
  const { dictionaryLinkLabel } = useIntlayer('tags-dictionaries-list');
  const { data, isLoading } = useGetDictionaries({
    args: {
      tags: [tagKey],
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <Loader isLoading={isLoading}>
        {data?.data?.map((dictionary) => (
          <Link
            href={`${PagesRoutes.Dashboard_Content}/${dictionary._id}`}
            key={String(dictionary._id)}
            variant="hoverable"
            label={dictionaryLinkLabel.value}
          >
            {dictionary.title ?? dictionary.key}
          </Link>
        ))}

        {data?.data?.length === 0 && <NoDictionaryView />}
      </Loader>
    </div>
  );
};
