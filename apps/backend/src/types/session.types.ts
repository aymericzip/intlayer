export type Session = {
  /** A randomly generated value that is used to get hold of the session. */
  token: string;
  /** Used to connect the session to a particular user */
  expires: Date;
  /** Used to connect the session to a particular user */
  userId: string;
  /** Used to connect the session to a particular organization */
  organizationId?: string;
  /** Used to connect the session to a particular project */
  projectId?: string;
};
