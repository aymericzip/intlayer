// fallow-ignore-next-line unresolved-imports
import type messages from './messages/en.json';

declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}
