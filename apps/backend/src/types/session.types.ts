export interface EmailPasswordSessionProvider {
  provider: 'email';
  secret?: string;
  emailValidated?: Date;
  passwordHash?: string;
}

export interface GoogleSessionProvider {
  provider: 'google';
  providerAccountId: string;
}

export interface GithubSessionProvider {
  provider: 'github';
  providerAccountId: string;
}

export type SessionProviders =
  | EmailPasswordSessionProvider
  | GoogleSessionProvider
  | GithubSessionProvider;

export type Session = {
  /** A randomly generated value that is used to get hold of the session. */
  sessionToken: string;
  /** Used to connect the session to a particular user */
  expires: Date;
};
