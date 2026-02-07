/**
 * Utility for tsdown to optimize the build process of assets and avoid them to be duplicated accross CJS and MJS output
 */
declare module 'utils:asset' {
  export function readAsset(
    relFromSrc: string,
    encoding?: BufferEncoding
  ): string;
}
