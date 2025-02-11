export type Route = {
  urlModel: string;

  url: string | ((args: any) => string);
  method: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
};

export type Routes = Record<string, Route>;
