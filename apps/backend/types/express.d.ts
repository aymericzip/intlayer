import { Session } from '@/types/session.types';
import 'express';
import OAuth2Server from 'oauth2-server';

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
