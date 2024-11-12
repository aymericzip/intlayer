/**
 * Type definition for options used in the fetcher function.
 * Extends the standard RequestInit interface (excluding 'body'),
 * and adds 'body' and 'params' properties for convenience.
 */
export type FetcherOptions = Omit<RequestInit, 'body'> & {
  /**
   * Body of the request. Should be a key-value pair object.
   */
  body?: Record<string, unknown>;
  /**
   * Query parameters to be appended to the URL.
   */
  params?:
    | Record<string, string | string[] | undefined>
    | string[]
    | URLSearchParams;
};

/**
 * Default options for the fetcher function.
 * Sets the default method to 'GET', the 'Content-Type' header to 'application/json',
 * and includes credentials in the request.
 */
export const fetcherOptions: FetcherOptions = {
  method: 'GET', // Default HTTP method
  headers: {
    'Content-Type': 'application/json', // Default content type
  },
  credentials: 'include', // Include cookies in the request
};

/**
 * Utility function to remove properties with undefined values from an object.
 * This helps prevent sending undefined values in the request options.
 *
 * @param obj - The object to clean.
 * @returns The cleaned object without undefined values.
 */
const removeUndefined = (obj: object) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key as keyof typeof obj] === undefined) {
      delete obj[key as keyof typeof obj];
    }
  });
  return obj;
};

/**
 * Deeply merges an array of objects into a single object.
 * Later objects in the array overwrite properties of earlier ones.
 *
 * @template T - The type of objects being merged.
 * @param objects - An array of objects to merge.
 * @returns The merged object.
 */
const deepMerge = <T extends object>(objects: (T | undefined)[]): T =>
  objects.reduce((acc, obj) => {
    const acc1: T = (acc ?? {}) as T;
    const obj1: T = removeUndefined(obj ?? {}) as T;

    if (typeof acc1 === 'object' && typeof obj1 === 'object') {
      // Merge the two objects
      return { ...acc1, ...obj1 };
    }

    // If one of them is not an object, return the defined one
    return obj1 ?? acc1;
  }, {} as T)!;

/**
 * Fetcher function to make HTTP requests.
 * It merges default options with user-provided options,
 * handles query parameters and request body,
 * and returns the parsed JSON response.
 *
 * @template T - The expected type of the response data.
 * @param url - The endpoint URL.
 * @param options - Additional options to customize the request.
 * @returns A promise that resolves with the response data of type T.
 *
 * @example
 * ```typescript
 * // Making a GET request with query parameters
 * const data = await fetcher<MyResponseType>('https://api.example.com/data', {
 *   params: { search: 'query' },
 * });
 *
 * // Making a POST request with a JSON body
 * const result = await fetcher<AnotherResponseType>('https://api.example.com/submit', {
 *   method: 'POST',
 *   body: { key: 'value' },
 * });
 *
 * // Merge body, headers, and params
 * const result = await fetcher<AnotherResponseType>('https://api.example.com/submit', {
 *   method: 'POST',
 *   body: { key: 'value' },
 *   headers: { 'Content-Type': 'application/json' },
 *   params: { search: 'query' },
 * },
 * {
 *   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
 *   params: { page: 1 },
 * });
 * ```
 *
 * Result:
 * ```typescript
 * {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
 *   params: { page: 1, search: 'query' },
 *   body: { key: 'value' },
 * }
 * ```
 */
export const fetcher = async <T>(
  url: string,
  ...options: FetcherOptions[]
): Promise<T> => {
  // Initialize query parameters string and request body string
  let paramsString = '';
  let bodyString: string | undefined = undefined;

  // Extract other options excluding 'body', 'params', and 'headers'
  const otherOptions = options.map(
    ({ body, params, headers, ...otherOptions }) => otherOptions
  );

  // Merge default options with user-provided options
  const mergedOptions = deepMerge([fetcherOptions, ...otherOptions]);

  // Merge default headers with user-provided headers
  const mergedHeaders = deepMerge([
    fetcherOptions.headers,
    ...options.map((option) => option.headers),
  ]);

  // Merge query parameters
  const params = deepMerge(options.map((option) => option.params));

  const method = mergedOptions.method;

  // If the request method is not 'GET' or 'HEAD', prepare the request body
  if (method !== 'GET' && method !== 'HEAD') {
    // Merge all 'body' options
    const body = deepMerge(options.map((option) => option.body));
    if (
      mergedHeaders?.['Content-Type' as keyof HeadersInit] ===
      'application/x-www-form-urlencoded'
    ) {
      // If the content type is 'application/x-www-form-urlencoded', encode the body accordingly
      bodyString = new URLSearchParams(
        body as Record<string, string>
      ).toString();
    } else {
      // Otherwise, stringify the body as JSON
      bodyString = JSON.stringify(body);
    }
  }

  // If there are query parameters, append them to the URL
  if (Object.entries(params).length > 0) {
    paramsString = `?${new URLSearchParams(
      params as Record<string, string>
    ).toString()}`;
  }

  // Prepare the final request options
  const formattedOptions: RequestInit = {
    ...mergedOptions,
    headers: mergedHeaders,
    body: bodyString,
  };

  // Construct the full URL with query parameters
  const urlResult = `${url}${paramsString}`;

  // Make the HTTP request using fetch
  return (await fetch(urlResult, formattedOptions)).json();
};
