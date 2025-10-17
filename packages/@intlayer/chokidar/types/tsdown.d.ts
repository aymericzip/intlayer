// src/types/utils-asset.d.ts
declare module 'utils:asset' {
  export function readAsset(
    relFromSrc: string,
    encoding?: BufferEncoding
  ): string;
}
