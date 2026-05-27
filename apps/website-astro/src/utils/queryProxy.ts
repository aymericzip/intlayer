export const queryProxy = (request: Request) => {
  const url = new URL(request.url);
  const headers = new Headers(request.headers);

  headers.set('x-current-query', url.searchParams.toString());
  headers.set('x-current-url', request.url.toString());

  return new Request(request, { headers });
};

export const getQueryParams = (request?: Request) => {
  const searchParamsString = request?.headers.get('x-current-query') ?? '';
  const url = request?.headers.get('x-current-url') ?? '';

  const searchParams = new URLSearchParams(searchParamsString);
  const redirectUrl = searchParams.get('redirect_url');
  const pathname = `/${url.split('/').slice(3).join('/')}`;

  return { redirectUrl, url, pathname };
};
