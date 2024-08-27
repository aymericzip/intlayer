/* eslint-disable prefer-arrow-functions/prefer-arrow-functions */
import { HttpStatusCodes } from '@utils/httpStatusCodes';

export type ResponseData<T = null> = {
  success: boolean;
  status: HttpStatusCodes;
  data: T | null;
  error?: string | string[];
};

type ValidResponseStatus =
  | HttpStatusCodes.OK
  | HttpStatusCodes.CREATED
  | HttpStatusCodes.ACCEPTED
  | HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION
  | HttpStatusCodes.NO_CONTENT
  | HttpStatusCodes.RESET_CONTENT
  | HttpStatusCodes.PARTIAL_CONTENT
  | HttpStatusCodes.MULTI_STATUS
  | HttpStatusCodes.ALREADY_REPORTED
  | HttpStatusCodes.IM_USED;

type SuccessResponseArgs<T = undefined> = {
  data: T;
  status?: ValidResponseStatus;
  error?: undefined;
};

type ErrorResponseArgs = {
  error: string | string[];
  status: HttpStatusCodes;
  data?: undefined;
};

const isSuccessStatus = (
  status: HttpStatusCodes
): status is HttpStatusCodes.OK =>
  status === HttpStatusCodes.OK ||
  status === HttpStatusCodes.CREATED ||
  status === HttpStatusCodes.ACCEPTED ||
  status === HttpStatusCodes.NON_AUTHORITATIVE_INFORMATION ||
  status === HttpStatusCodes.NO_CONTENT ||
  status === HttpStatusCodes.RESET_CONTENT ||
  status === HttpStatusCodes.PARTIAL_CONTENT ||
  status === HttpStatusCodes.MULTI_STATUS ||
  status === HttpStatusCodes.ALREADY_REPORTED ||
  status === HttpStatusCodes.IM_USED;

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
  status = HttpStatusCodes.OK,
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

  error?: undefined;
};

type ErrorPaginatedResponseArgs = {
  error: string | string[];
  status: HttpStatusCodes;

  data?: undefined;
  page?: undefined;
  pageSize?: undefined;
  totalPages?: undefined;
  totalItems?: undefined;
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
  status = HttpStatusCodes.OK,
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
    error,
    status,
    page: page ?? null,
    page_size: pageSize ?? null,
    total_pages: totalPages ?? null,
    total_items: totalItems ?? null,
  };
}
