import type { Request } from 'express';

type Filters = Record<string, unknown>;

export type FiltersAndPagination<T extends Filters> = {
  filters: T;
  page?: number | string;
  pageSize?: number | string;
};

export type FiltersAndPaginationResult<T extends Filters> = {
  filters: T;
  page: number;
  skip: number;
  pageSize: number;
  getNumberOfPages: (totalItems: number) => number;
};

export const getFiltersAndPaginationFromBody = <T extends Filters>(
  req: Request<FiltersAndPagination<T>>
): FiltersAndPaginationResult<T> => {
  let filters = {} as T;
  let pageSize = 100;
  let page = 1;

  const query = req.query as unknown as FiltersAndPagination<T>;

  if (typeof query === 'object') {
    const {
      pageSize: pageSizeRequest,
      page: pageRequest,
      filters: filtersRequest,
    } = query;

    if (typeof pageSizeRequest === 'string') {
      pageSize = parseInt(pageSizeRequest);
    } else if (typeof pageSizeRequest === 'number') {
      pageSize = pageSizeRequest;
    }

    if (typeof pageRequest === 'string') {
      page = parseInt(pageRequest);
    } else if (typeof pageRequest === 'number') {
      page = pageRequest;
    }

    if (Object.keys(filtersRequest).length > 0) {
      filters = filtersRequest;
    }
  }

  const skip = (page - 1) * pageSize;

  const getNumberOfPages = (totalItems: number) =>
    Math.ceil(totalItems / pageSize);

  return { filters, skip, page, pageSize, getNumberOfPages };
};
