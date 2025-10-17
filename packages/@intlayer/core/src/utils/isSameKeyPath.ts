import type { KeyPath } from '../types';

type KeyPathWithKey = KeyPath & { key: string };

export const isSameKeyPath = (keyPath1: KeyPath[], keyPath2: KeyPath[]) =>
  keyPath1.every(
    (element, index) =>
      keyPath2[index] &&
      (keyPath2[index] as KeyPathWithKey).key ===
        (element as KeyPathWithKey).key &&
      keyPath2[index].type === element.type
  );
