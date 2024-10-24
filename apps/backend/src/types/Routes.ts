export type Route = {
  urlModel: string;
  url: string | ((args: Record<string, string>) => string);
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
};

export type Routes = Record<string, Route>;
