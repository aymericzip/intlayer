import { doubleCsrf } from 'csrf-csrf';
import { Cookies, getCookieOptions } from './cookies';

const {
  generateToken, // Use this in your routes to provide a CSRF hash + token cookie and token.
  validateRequest, // Also a convenience if you plan on making your own middleware.
  doubleCsrfProtection, // This is the default CSRF protection middleware.
} = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET,
  getTokenFromRequest: (req) => req.body.csrf_token,
  cookieName: Cookies.XSRF_TOKEN,
  cookieOptions: getCookieOptions(),
});

export { generateToken, validateRequest, doubleCsrfProtection };
