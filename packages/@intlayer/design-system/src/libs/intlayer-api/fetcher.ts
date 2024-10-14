export type FetcherOptions = Omit<RequestInit, 'body'> & {
  body?: Record<string, unknown>;
  params?:
    | Record<string, string | string[] | undefined>
    | string[]
    | URLSearchParams;
};

export const fetcherOptions: FetcherOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
};

const removeUndefined = (obj: object) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key as keyof typeof obj] === undefined) {
      delete obj[key as keyof typeof obj];
    }
  });
  return obj;
};

const deepMerge = <T extends object>(objects: (T | undefined)[]): T =>
  objects.reduce((acc, obj) => {
    const acc1: T = (acc ?? {}) as T;
    const obj1: T = removeUndefined(obj ?? {}) as T;

    if (typeof acc1 === 'object' && typeof obj1 === 'object') {
      return { ...acc1, ...obj1 };
    }

    return obj1 ?? acc1;
  }, {} as T)!;

export const fetcher = async <T>(
  url: string,
  ...options: FetcherOptions[]
): Promise<T> => {
  let paramsString = '';
  let bodyString: string | undefined = undefined;
  const otherOptions = options.map(
    ({ body, params, headers, ...otherOptions }) => otherOptions
  );
  const mergedOptions = deepMerge([fetcherOptions, ...otherOptions]);
  const mergedHeaders = deepMerge([
    fetcherOptions.headers,
    ...options.map((option) => option.headers),
  ]);

  const params = deepMerge(options.map((option) => option.params));

  const method = mergedOptions.method;
  if (method !== 'GET' && method !== 'HEAD') {
    const body = deepMerge(options.map((option) => option.body));
    if (
      mergedHeaders?.['Content-Type' as keyof HeadersInit] ===
      'application/x-www-form-urlencoded'
    ) {
      bodyString = new URLSearchParams(
        body as Record<string, string>
      ).toString();
    } else {
      bodyString = JSON.stringify(body);
    }
  }

  if (Object.entries(params).length > 0) {
    paramsString = `?${new URLSearchParams(params as Record<string, string>).toString()}`;
  }

  const formattedOptions: RequestInit = {
    ...mergedOptions,
    headers: mergedHeaders,
    body: bodyString,
  };

  const urlResult = `${url}${paramsString}`;

  const response = await fetch(urlResult, formattedOptions);

  // Check if the response status is OK (between 200-299)
  if (!response.ok) {
    const errorBody = await response.json(); // Parse error details from the response
    throw new Error(errorBody.error);
  }

  return response.json();
};
