'use client';

import { useEffect, useState } from 'react';

export const useGetElementById = (id: string) => {
  const [element, setElement] = useState<HTMLElement | undefined | null>(
    undefined
  );

  // This useEffect avoids the error of not finding the container
  useEffect(() => {
    setElement(document.getElementById(id));
  }, [id]);

  return element;
};
