export type DictionaryStatus =
  | 'pending'
  | 'fetching'
  | 'up-to-date'
  | 'replaced'
  | 'updated'
  | 'fetched'
  | 'unknown'
  | 'error'
  | 'imported'
  | 'reimported in JSON'
  | 'reimported in new location';
