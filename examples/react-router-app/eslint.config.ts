import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
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
