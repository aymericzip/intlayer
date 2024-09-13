import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';

export const multipleMiddlewares =
  (
    middlewares: ((
      req: NextRequest,
      event?: NextFetchEvent,
      response?: NextResponse
    ) => NextResponse | Promise<NextResponse>)[]
  ) =>
  async (req: NextRequest, event?: NextFetchEvent, response?: NextResponse) => {
    // Array to store middleware headers
    const middlewareHeader = [];

    // Loop through middleware functions
    for (const middleware of middlewares) {
      // Execute middleware function and await the result
      const result = await middleware(req, event, response);

      // Check if the result is not okay and return it
      if (!result.ok) {
        return result;
      }

      // Push middleware headers to the array
      middlewareHeader.push(result.headers);
    }

    // Merge all the headers to check if there is a redirection or rewrite
    const mergedHeaders = new Headers();

    // Merge all the custom headers added by the middlewares
    const transmittedHeaders = new Headers();

    // Merge
    middlewareHeader.forEach((header) => {
      for (const [key, value] of header.entries()) {
        mergedHeaders.append(key, value);

        // check if its a custom header added by one of the middlewares
        if (key.startsWith('x-middleware-request-')) {
          // remove the prefix to get the original key
          const fixedKey = key.replace('x-middleware-request-', '');

          // add the original key to the transmitted headers
          transmittedHeaders.append(fixedKey, value);
        }
      }
    });

    // Look for the 'x-middleware-request-redirect' header
    const redirect = mergedHeaders.get('x-middleware-request-redirect');

    // If a redirection is required based on the middleware headers
    if (redirect) {
      // Perform the redirection
      return NextResponse.redirect(new URL(redirect, req.url), {
        status: 307, // Use the appropriate HTTP status code for the redirect
      });
    }

    // Look for the 'x-middleware-rewrite' header
    const rewrite = mergedHeaders.get('x-middleware-rewrite');
    if (rewrite) {
      // Perform the rewrite
      return NextResponse.rewrite(new URL(rewrite, req.url), {
        request: {
          headers: transmittedHeaders,
        },
      });
    }

    // Initialize a NextResponse object
    return NextResponse.next({
      request: {
        headers: transmittedHeaders,
      },
    });
  };
