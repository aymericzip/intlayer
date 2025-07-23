import 'express';
import OAuth2Server from 'oauth2-server';
import { Session } from '../src/types/session.types';

declare module 'express' {
  interface Request {
    locals: {
      oauth?: OAuth2Server;
    };
  }

  interface Response {
    locals: Session;
  }
}
