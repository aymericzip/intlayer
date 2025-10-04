// Temporarily disable Tailwind CSS plugin due to version incompatibility
// import eslintPluginTailwindCss from 'eslint-plugin-tailwindcss';

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    // Temporarily disabled due to Tailwind CSS version incompatibility
    // plugins: {
    //   tailwindcss: eslintPluginTailwindCss,
    // },
    // rules: {
    //   'tailwindcss/classnames-order': 'off',
    //   'tailwindcss/enforces-negative-arbitrary-values': 'warn',
    //   'tailwindcss/enforces-shorthand': 'warn',
    //   'tailwindcss/migration-from-tailwind-2': 'warn',
    //   'tailwindcss/no-arbitrary-value': 'off',
    //   'tailwindcss/no-custom-classname': 'off',
    //   'tailwindcss/no-contradicting-classname': 'error',
    //   'tailwindcss/no-unnecessary-arbitrary-value': 'warn',
    // },
  },
];

export default config;
