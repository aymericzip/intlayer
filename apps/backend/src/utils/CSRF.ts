import { doubleCsrf } from 'csrf-csrf';
import { Cookies, getCookieOptions } from './cookies';

const {
  generateCsrfToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
  validateRequest, // Also a convenience if you plan on making your own middleware.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  getSessionIdentifier: (req) => {
    // Use session ID if available, otherwise fallback to IP + User-Agent hash
    return (
      (req as any).sessionID ||
      `${req.ip}-${req.get('User-Agent')}` ||
      'anonymous'
    );
  },
  getCsrfTokenFromRequest: (req) => req.body.csrf_token,
  cookieName: Cookies.XSRF_TOKEN,
  cookieOptions: getCookieOptions(),
});

export {
  doubleCsrfProtection,
  generateCsrfToken as generateToken,
  validateRequest,
};
