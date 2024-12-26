export const ensureArrayQueryFilter = (
  filter: string | string[] | undefined
): string[] | undefined => {
  let idsArray: string[];

  if (typeof filter === 'string') {
    idsArray = filter.split(',');
  } else if (Array.isArray(filter)) {
    idsArray = filter;
  } else {
    idsArray = [];
  }

  return idsArray;
};
