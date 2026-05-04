export const getPathHash = (filePath: string) => {
  let hash = 0;
  for (let i = 0; i < filePath.length; i++) {
    hash = (hash << 5) - hash + filePath.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
};
