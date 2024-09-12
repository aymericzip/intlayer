'use client';

import { useEffect, useState } from 'react';

export const useGetElementOrWindow = (container?: HTMLElement) => {
  const [containerElement, setContainerElement] = useState<
    HTMLElement | undefined
  >(container);

  // This useEffect avoids the error of not finding the container
  useEffect(() => {
    setContainerElement(container ?? window.document.body);
  }, [container]);

  return containerElement;
};
