import { type Dictionary, t } from 'intlayer';

interface User {
  name: string;
  age: number;
}

const userContent: Dictionary = {
  key: 'user',
  schema: 'user',
  content: {
    nakme: t({
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

export default userContent;
