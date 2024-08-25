/* eslint-disable sonarjs/no-duplicate-string */
import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const tailwindConfig = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    aria: {
      invalid: 'invalid="true"',
    },
    screens: {
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ['Inter Variable'],
    },
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        background: {
          DEFAULT: 'rgba(255, 255, 255, <alpha-value>)',
          dark: 'rgba(23, 23, 23, <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgba(18, 18, 18, <alpha-value>)',
          dark: 'rgba(255, 245, 237, <alpha-value>)',
          opposite: {
            DEFAULT: 'rgba(255, 245, 237, <alpha-value>)',
            dark: 'rgba(28, 28, 28, <alpha-value>)',
          },
        },
        card: {
          DEFAULT: 'rgba(231, 231, 231, <alpha-value>)',
          dark: 'rgba(39, 39, 39, <alpha-value>)',
          hover: {
            DEFAULT: 'rgba(231, 231, 231, <alpha-value>)',
            dark: 'rgba(79, 79, 79, <alpha-value>)',
          },
        },
        hypertext: {
          DEFAULT: 'rgba(232, 121, 249, <alpha-value>)',
          dark: 'rgba(232, 121, 249, <alpha-value>)',
          hover: {
            DEFAULT: 'rgba(197, 101, 212, <alpha-value>)',
            dark: 'rgba(197, 101, 212, <alpha-value>)',
          },
          active: {
            DEFAULT: 'rgba(232, 121, 249, <alpha-value>)',
            dark: 'rgba(232, 121, 249, <alpha-value>)',
          },
        },
        shadow: {
          DEFAULT: 'rgba(18, 18, 18, <alpha-value>)',
          dark: 'rgba(18, 18, 18, <alpha-value>)',
        },
        input: {
          background: {
            DEFAULT: 'rgba(255, 255, 255, <alpha-value>)',
            dark: 'rgba(61, 61, 61, <alpha-value>)',
          },
          text: {
            DEFAULT: 'rgba(18, 18, 18, <alpha-value>)',
            dark: 'rgba(246, 246, 246, <alpha-value>)',
          },
          border: {
            DEFAULT: 'rgba(246, 246, 246, <alpha-value>)',
            dark: 'rgba(79, 79, 79, <alpha-value>)',
            hover: {
              DEFAULT: 'rgba(231, 231, 231, <alpha-value>)',
              dark: 'rgba(93, 93, 93, <alpha-value>)',
            },
            focus: {
              DEFAULT: 'rgba(209, 209, 209, <alpha-value>)',
              dark: 'rgba(176, 176, 176, <alpha-value>)',
            },
          },
        },
        error: {
          DEFAULT: 'rgba(181, 24, 13, <alpha-value>)',
          dark: 'rgba(255, 88, 77, <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgba(255, 230, 109, <alpha-value>)',
          dark: 'rgba(255, 216, 69, <alpha-value>)',
        },
        white: {
          DEFAULT: 'rgba(255, 255, 255, <alpha-value>)',
          dark: 'rgba(255, 255, 255, <alpha-value>)',
        },
        black: {
          DEFAULT: 'rgba(0, 0, 0, <alpha-value>)',
          dark: 'rgba(0, 0, 0, <alpha-value>)',
        },
        primary: {
          DEFAULT: 'rgba(232, 121, 249, <alpha-value>)',
          dark: 'rgba(232, 121, 249, <alpha-value>)',
          '50': 'rgba(254, 244, 255, <alpha-value>)',
          '100': 'rgba(252, 232, 255, <alpha-value>)',
          '200': 'rgba(248, 208, 254, <alpha-value>)',
          '300': 'rgba(241, 171, 252, <alpha-value>)',
          '400': 'rgba(232, 121, 249, <alpha-value>)',
          '500': 'rgba(197, 101, 212, <alpha-value>)',
          '600': 'rgba(163, 81, 175, <alpha-value>)',
          '700': 'rgba(128, 61, 139, <alpha-value>)',
          '800': 'rgba(93, 41, 102, <alpha-value>)',
          '900': 'rgba(59, 21, 65, <alpha-value>)',
          '950': 'rgba(24, 1, 28, <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgba(255, 230, 109, <alpha-value>)',
          dark: 'rgba(255, 230, 109, <alpha-value>)',
          '50': 'rgba(254, 251, 232, <alpha-value>)',
          '100': 'rgba(255, 246, 194, <alpha-value>)',
          '200': 'rgba(255, 230, 109, <alpha-value>)',
          '300': 'rgba(255, 216, 69, <alpha-value>)',
          '400': 'rgba(252, 193, 19, <alpha-value>)',
          '500': 'rgba(236, 168, 6, <alpha-value>)',
          '600': 'rgba(204, 129, 2, <alpha-value>)',
          '700': 'rgba(162, 90, 6, <alpha-value>)',
          '800': 'rgba(134, 71, 13, <alpha-value>)',
          '900': 'rgba(114, 58, 17, <alpha-value>)',
          '950': 'rgba(67, 29, 5, <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgba(251, 125, 60, <alpha-value>)',
          dark: 'rgba(251, 125, 60, <alpha-value>)',
          '50': 'rgba(255, 245, 237, <alpha-value>)',
          '100': 'rgba(255, 232, 213, <alpha-value>)',
          '200': 'rgba(254, 206, 170, <alpha-value>)',
          '300': 'rgba(253, 171, 116, <alpha-value>)',
          '400': 'rgba(251, 125, 60, <alpha-value>)',
          '500': 'rgba(249, 90, 22, <alpha-value>)',
          '600': 'rgba(234, 63, 12, <alpha-value>)',
          '700': 'rgba(194, 45, 12, <alpha-value>)',
          '800': 'rgba(154, 37, 18, <alpha-value>)',
          '900': 'rgba(124, 33, 18, <alpha-value>)',
          '950': 'rgba(67, 13, 7, <alpha-value>)',
        },
        neutral: {
          DEFAULT: 'rgba(93, 93, 93, <alpha-value>)',
          dark: 'rgba(136, 136, 136, <alpha-value>)',
          '50': 'rgba(246, 246, 246, <alpha-value>)',
          '100': 'rgba(231, 231, 231, <alpha-value>)',
          '200': 'rgba(209, 209, 209, <alpha-value>)',
          '300': 'rgba(176, 176, 176, <alpha-value>)',
          '400': 'rgba(136, 136, 136, <alpha-value>)',
          '500': 'rgba(109, 109, 109, <alpha-value>)',
          '600': 'rgba(93, 93, 93, <alpha-value>)',
          '700': 'rgba(79, 79, 79, <alpha-value>)',
          '800': 'rgba(69, 69, 69, <alpha-value>)',
          '900': 'rgba(61, 61, 61, <alpha-value>)',
          '950': 'rgba(48, 48, 48, <alpha-value>)',
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/aspect-ratio'),
  ],
} satisfies Partial<Config>;

export default tailwindConfig;
