export type Route = {
  urlModel: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  url: string | ((args: any) => string);
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
};

export type Routes = Record<string, Route>;
