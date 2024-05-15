type ErrorMessage = {
  message: string;
  code: string;
  status: number;
};

export const getErrorMessage = (error: { code: string }): ErrorMessage => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return {
        message: 'The email address is already in use',
        code: error.code,
        status: 409,
      };
    case 'auth/invalid-email':
      return {
        message: 'The email address is not valid',
        code: error.code,
        status: 400,
      };
    case 'auth/operation-not-allowed':
      return {
        message: 'Operation not allowed',
        code: error.code,
        status: 403,
      };
    case 'auth/weak-password':
      return {
        message: 'The password is too weak',
        code: error.code,
        status: 400,
      };
    case 'auth/claims-too-large':
      return {
        message:
          'The claims payload exceeds the maximum allowed size of 1000 bytes.',
        code: error.code,
        status: 400,
      };
    case 'auth/email-already-exists':
      return {
        message: 'The provided email is already in use by an existing user.',
        code: error.code,
        status: 409,
      };
    case 'auth/id-token-expired':
      return {
        message: 'The provided Firebase ID token is expired.',
        code: error.code,
        status: 401,
      };
    case 'auth/id-token-revoked':
      return {
        message: 'The Firebase ID token has been revoked.',
        code: error.code,
        status: 401,
      };
    case 'auth/insufficient-permission':
      return {
        message:
          'Insufficient permission to access the requested Authentication resource.',
        code: error.code,
        status: 403,
      };
    case 'auth/internal-error':
      return {
        message: 'An unexpected error occurred while processing the request.',
        code: error.code,
        status: 500,
      };
    case 'auth/invalid-argument':
      return {
        message:
          'An invalid argument was provided to an Authentication method.',
        code: error.code,
        status: 400,
      };
    case 'auth/invalid-claims':
      return {
        message: 'The custom claim attributes provided are invalid.',
        code: error.code,
        status: 400,
      };
    case 'auth/invalid-continue-uri':
      return {
        message: 'The continue URL must be a valid URL string.',
        code: error.code,
        status: 400,
      };
    case 'auth/user-not-found':
      return {
        message:
          'There is no existing user record corresponding to the provided identifier.',
        code: error.code,
        status: 404,
      };
    default:
      return {
        message: 'An unknown error occurred.',
        code: 'unknown',
        status: 500,
      };
  }
};
