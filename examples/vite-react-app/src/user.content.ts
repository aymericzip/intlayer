import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const userContent: Dictionary = {
  key: 'user',
  schema: 'user',
  content: {
    name: t({
      en: 'John Doe',
      fr: 'Jean Dupont',
      es: 'Juan Pérez',
    }),
    age: t({
      en: 30,
      fr: 30,
      es: 30,
    }),
  },
} satisfies Dictionary;

interface User {
  name: string;
  age: number;
}

const userContent2 = {
  key: 'user',
  schema: 'user',
  content: {
    name: t({
      en: 'John Doe',
      fr: 'Jean Dupont',
      es: 'Juan Pérez',
    }),
    age: t({
      en: 30,
      fr: 30,
      es: 30,
    }),
  },
} satisfies Dictionary<User>;

export default userContent;
