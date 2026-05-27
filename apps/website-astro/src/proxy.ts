// In Astro, routing and middleware are handled differently than in Next.js.
// This file is kept as a stub; request manipulation is done in Astro middleware if needed.

export const proxy = (_request: Request) => _request;

// applies this middleware only to files in the app directory
export const config = {
  matcher:
    '/((?!api|static|assets|robots|sitemap|schema|sw|service-worker|manifest|.*\\..*|_next).*)',
};
