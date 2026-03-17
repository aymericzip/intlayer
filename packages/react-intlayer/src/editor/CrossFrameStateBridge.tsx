'use client';

import { useCrossFrameState } from '@intlayer/editor-react';
import { MessageKey } from '@intlayer/types/messageKey';
import { type FC, useEffect } from 'react';

export type CrossFrameStateBridgeProps = {
  value: any;
  setValue: (value: any) => void;
};

export const CrossFrameStateBridge: FC<CrossFrameStateBridgeProps> = ({
  value,
  setValue,
}) => {
  const [cfValue, setCfValue] = useCrossFrameState(
    MessageKey.INTLAYER_CURRENT_LOCALE,
    value
  );

  useEffect(() => {
    if (cfValue !== value) {
      setValue(cfValue);
    }
  }, [cfValue, value, setValue]);

  useEffect(() => {
    if (cfValue !== value) {
      setCfValue(value);
    }
  }, [value, cfValue, setCfValue]);

  return null;
};
