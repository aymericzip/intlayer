export const fetcherOptions: RequestInit = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

type FetcherOptions = Omit<RequestInit, 'body'> & {
  body?: object | string;
  params?:
    | string
    | Record<string, string | string[]>
    | string[]
    | URLSearchParams
    | undefined;
};

export const fetcher = async <T>(
  url: string,
  { body, params, ...options }: FetcherOptions = {}
): Promise<T> => {
  let paramsString = '';

  if (params) {
    paramsString = `?${new URLSearchParams(params as URLSearchParams).toString()}`;
  }

  const mergedOptions: RequestInit = {
    ...fetcherOptions,
    ...options,
    body: JSON.stringify(body),
  };

  const response = await fetch(`${url}${paramsString}`, mergedOptions);

  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  return response.json();
};
