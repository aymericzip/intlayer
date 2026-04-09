import type { FC } from 'react';
import { useBaiduAutoPush } from './useBaiduAutoPush';

export const BaiduAutoPushSubscriber: FC = () => {
  useBaiduAutoPush();

  return <></>;
};
