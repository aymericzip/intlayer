import type { FC } from 'react';
import { DictionaryListDashboard } from '../DictionaryListDashboard';

type TagsDictionariesListProps = {
  tagKey: string;
};

export const TagsDictionariesList: FC<TagsDictionariesListProps> = ({
  tagKey,
}) => <DictionaryListDashboard tagKey={tagKey} />;
