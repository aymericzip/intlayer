import type { Dictionary } from 'intlayer';
import { t } from 'intlayer';

const userContent: Dictionary = {
  key: 'user',
  schema: 'user',
  content: {
    age: t({
      en: 30,
      es: 30,
      fr: 30,
    }),
    name: t({
      en: 'John Doe',
      es: 'Juan Pérez',
      fr: 'Jean Dupont',
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
    age: t({
      en: 30,
      es: 30,
      fr: 30,
    }),
    name: t({
      en: 'John Doe',
      es: 'Juan Pérez',
      fr: 'Jean Dupont',
    }),
  },
} satisfies Dictionary<User>;

export default userContent;
