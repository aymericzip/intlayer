import { defineConfig } from '@adonisjs/core/app';

export default defineConfig({
  /*
  |--------------------------------------------------------------------------
  | Commands
  |--------------------------------------------------------------------------
  |
  | List of ace commands to register from the core, authorized packages
  | and the local project
  |
  */
  commands: [() => import('@adonisjs/core/commands')],

  /*
  |--------------------------------------------------------------------------
  | Service providers
  |--------------------------------------------------------------------------
  |
  | List of service providers to import and register when booting the
  | application
  |
  */
  providers: [
    () => import('@adonisjs/core/providers/app_provider'),
    () => import('@adonisjs/core/providers/hash_provider'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Preloads
  |--------------------------------------------------------------------------
  |
  | List of modules to import before starting the application.
  |
  */
  preloads: [
    () => import('./start/routes.js'),
    () => import('./start/kernel.js'),
  ],

  /*
  |--------------------------------------------------------------------------
  | Tests
  |--------------------------------------------------------------------------
  |
  | List of test suites to register.
  |
  */
  tests: {
    suites: [
      {
        files: ['tests/**/*.spec(.ts|.js)'],
        name: 'functional',
        timeout: 30000,
      },
    ],
  },
});
