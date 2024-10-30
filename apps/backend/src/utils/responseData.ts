import { HttpStatusCodes } from '@utils/httpStatusCodes';

type ErrorData = {
  code: string;
  message: string;
} & object;

export type ResponseData<T = null> = {
  success: boolean;
  status: HttpStatusCodes;
  data: T | null;
  error?: ErrorData | ErrorData[];
};

type ValidResponseStatus =
  | HttpStatusCodes.OK_200
  | HttpStatusCodes.CREATED_201
  | HttpStatusCodes.ACCEPTED_202
  | HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION_203
  | HttpStatusCodes.NO_CONTENT_204
  | HttpStatusCodes.RESET_CONTENT_205
  | HttpStatusCodes.PARTIAL_CONTENT_206
  | HttpStatusCodes.MULTI_STATUS_207
  | HttpStatusCodes.ALREADY_REPORTED_208
  | HttpStatusCodes.IM_USED_226;

type SuccessResponseArgs<T = undefined> = {
  data: T;
  status?: ValidResponseStatus;
  error?: null;
};

type ErrorResponseArgs = {
  error: ErrorData | ErrorData[];
  status: HttpStatusCodes;
  data?: null;
};

const isSuccessStatus = (
  status: HttpStatusCodes
): status is HttpStatusCodes.OK_200 =>
  status === HttpStatusCodes.OK_200 ||
  status === HttpStatusCodes.CREATED_201 ||
  status === HttpStatusCodes.ACCEPTED_202 ||
  status === HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION_203 ||
  status === HttpStatusCodes.NO_CONTENT_204 ||
  status === HttpStatusCodes.RESET_CONTENT_205 ||
  status === HttpStatusCodes.PARTIAL_CONTENT_206 ||
  status === HttpStatusCodes.MULTI_STATUS_207 ||
  status === HttpStatusCodes.ALREADY_REPORTED_208 ||
  status === HttpStatusCodes.IM_USED_226;

export function formatResponse<T>({
  data,
  status,
}: SuccessResponseArgs<T>): ResponseData<T>;
export function formatResponse<T>({
  error,
  status,
}: ErrorResponseArgs): ResponseData<T>;
export function formatResponse<T>({
  data,
  error,
  status = HttpStatusCodes.OK_200,
}: SuccessResponseArgs<T> | ErrorResponseArgs): ResponseData<T> {
  const success = isSuccessStatus(status);

  return {
    success,
    data: data ?? null,
    error: error ?? undefined,
    status,
  };
}

export type PaginatedResponse<T = undefined> = Omit<ResponseData<T>, 'data'> & {
  data: T[] | null;
  page: number | null;
  page_size: number | null;
  total_pages: number | null;
  total_items: number | null;
};

type SuccessPaginatedResponseArgs<T = undefined> = {
  data: T[];
  status?: ValidResponseStatus;
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;

  error?: null;
};

type ErrorPaginatedResponseArgs = {
  error: ErrorData | ErrorData[];
  status: HttpStatusCodes;

  data?: null;
  page?: null;
  pageSize?: null;
  totalPages?: null;
  totalItems?: null;
};

export function formatPaginatedResponse<T>({
  data,
  status,
  page,
  pageSize,
  totalPages,
  totalItems,
}: SuccessPaginatedResponseArgs<T>): PaginatedResponse<T>;
export function formatPaginatedResponse<T>({
  error,
  status,
}: ErrorPaginatedResponseArgs): PaginatedResponse<T>;
export function formatPaginatedResponse<T>({
  status = HttpStatusCodes.OK_200,
  data,
  error,
  page,
  pageSize,
  totalPages,
  totalItems,
}:
  | SuccessPaginatedResponseArgs<T>
  | ErrorPaginatedResponseArgs): PaginatedResponse<T> {
  const success = isSuccessStatus(status);

  return {
    success,
    data: data ?? null,
    error: error ?? undefined,
    status,
    page: page ?? null,
    page_size: pageSize ?? null,
    total_pages: totalPages ?? null,
    total_items: totalItems ?? null,
  };
}
