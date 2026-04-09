import { Button } from '@intlayer/design-system/button';
import { useGetDictionaries } from '@intlayer/design-system/hooks';
import { Loader } from '@intlayer/design-system/loader';
import { useFocusUnmergedDictionary } from '@intlayer/editor-react';
import { ChevronRight } from 'lucide-react';
import type { FC } from 'react';
import { useIntlayer } from 'react-intlayer';
import { useLocalizedNavigate } from '#hooks/useLocalizedNavigate.ts';

type TagsDictionariesListProps = {
  tagKey: string;
};

const NoDictionaryView: FC = () => {
  const { noDictionaryView } = useIntlayer('tags-dictionaries-list');

  return (
    <div className="m-auto flex max-w-[400px] flex-col justify-center gap-2 p-6">
      <strong className="font-bold text-lg">{noDictionaryView.title}</strong>
      <p className="text-neutral text-sm">{noDictionaryView.description}</p>
    </div>
  );
};

export const TagsDictionariesList: FC<TagsDictionariesListProps> = ({
  tagKey,
}) => {
  const navigate = useLocalizedNavigate();
  const { setFocusedContent } = useFocusUnmergedDictionary();
  const { dictionaryLinkLabel } = useIntlayer('tags-dictionaries-list');
  const { data, isFetching } = useGetDictionaries({
    tags: [tagKey],
  });

  return (
    <div className="flex flex-col gap-2">
      <Loader isLoading={!data && isFetching}>
        {data?.data?.map((dictionary: any) => (
          <Button
            key={dictionary.key}
            label={dictionaryLinkLabel.value}
            variant="hoverable"
            color="text"
            IconRight={ChevronRight}
            onClick={() => {
              setFocusedContent({
                dictionaryKey: dictionary.key,
                dictionaryLocalId: dictionary.localId,
                keyPath: [],
              });
              navigate({
                to: '/dictionary/$dictionaryKey',
                params: {
                  dictionaryKey: dictionary.key,
                },
                search: {
                  dictionaryLocalId: dictionary.localId,
                },
              });
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
                <span className="line-clamp-2 text-wrap text-neutral">
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
