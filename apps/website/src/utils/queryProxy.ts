const headers = () => new Headers();
const NextResponse = {
  json: (data: any) => new Response(JSON.stringify(data)),
};
type NextRequest = Request;

export const queryProxy = (request: NextRequest) => {
  const headers = new Headers(request.headers);

  headers.set('x-current-query', request?.nextUrl?.searchParams?.toString());
  headers.set('x-current-url', request?.url?.toString());

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
  const url = headerList.get('x-current-url') ?? '';

  const searchParams = new URLSearchParams(searchParamsString);
  const redirectUrl = searchParams.get('redirect_url');
  const pathname = `/${url.split('/').slice(3).join('/')}`;

  return { redirectUrl, url, pathname };
};
