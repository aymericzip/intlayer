import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['.intlayer', '.react-router'] },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  perfectionist.configs['recommended-alphabetical'],
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              importNames: ['Link', 'useNavigate'],
              name: 'react-router',
            },
          ],
        },
      ],
    },
  }
);
