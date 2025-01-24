export type DictionaryStatus =
  | 'pending'
  | 'fetching'
  | 'up-to-date'
  | 'updated'
  | 'fetched'
  | 'unknown'
  | 'error'
  | 'imported'
  | 'reimported in JSON'
  | 'reimported in new location';
