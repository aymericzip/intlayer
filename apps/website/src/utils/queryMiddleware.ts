import { headers } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';

export const queryMiddleware = (request: NextRequest) => {
  const headers = new Headers(request.headers);

  headers.set('x-current-query', request?.nextUrl?.searchParams?.toString());

  return NextResponse.next({
    request: {
      ...request,
      headers,
    },
  });
};

export const getQueryParams = async () => {
  const headerList = await headers();

  const searchParamsString = headerList.get('x-current-query') ?? '';

  const searchParams = new URLSearchParams(searchParamsString);

  return searchParams.get('redirect_url');
};
