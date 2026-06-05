export const namespaces = [
  'common',
  'about',
  'home',
  // add new namespaces here
] as const;

export type Namespace = (typeof namespaces)[number];
