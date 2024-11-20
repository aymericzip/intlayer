import { HttpStatusCodes } from '@utils/httpStatusCodes';

type ErrorData = {
  code: string;
  title: string;
  message: string;
} & object;

export type ResponseData<T = null> = {
  message?: string;
  description?: string;
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
  message?: string;
  description?: string;
  data: T;
  status?: ValidResponseStatus;
  error?: null;
};

type ErrorResponseArgs = {
  error: ErrorData | ErrorData[];
  status: HttpStatusCodes;
  data?: null;
  message?: null;
  description?: null;
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
  message,
  description,
  data,
  status,
}: SuccessResponseArgs<T>): ResponseData<T>;
export function formatResponse<T>({
  error,
  status,
}: ErrorResponseArgs): ResponseData<T>;
export function formatResponse<T>({
  message,
  description,
  data,
  error,
  status = HttpStatusCodes.OK_200,
}: SuccessResponseArgs<T> | ErrorResponseArgs): ResponseData<T> {
  const success = isSuccessStatus(status);

  return {
    success,
    message: message ?? undefined,
    description: description ?? undefined,
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
  message?: string;
  description?: string;
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

  message?: null;
  description?: null;
  data?: null;

  page?: null;
  pageSize?: null;
  totalPages?: null;
  totalItems?: null;
};

export function formatPaginatedResponse<T>({
  message,
  description,
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
  message,
  description,
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
    message: message ?? undefined,
    description: description ?? undefined,
    data: data ?? null,
    error: error ?? undefined,
    status,
    page: page ?? null,
    page_size: pageSize ?? null,
    total_pages: totalPages ?? null,
    total_items: totalItems ?? null,
  };
}
