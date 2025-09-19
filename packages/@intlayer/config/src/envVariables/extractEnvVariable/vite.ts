import { logger } from '../../logger';
import type {
  AiConfig,
  BuildConfig,
  ContentConfig,
  EditorConfig,
  InternationalizationConfig,
  LogConfig,
  MiddlewareConfig,
} from '../../types/config';
import type { IntlayerConfigEnvVariable, ReplaceValue } from './types';
import { extractEmptyEnvVariable } from './undefined_platform';

export const extractViteEnvVariable = (): IntlayerConfigEnvVariable => {
  if (!import.meta.env) {
    logger('Vite env variables cannot be loaded on a commonjs environment.', {
      level: 'error',
    });
    return extractEmptyEnvVariable();
  }

  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: import.meta.env.VITE_INTLAYER_LOCALES,
    requiredLocales: import.meta.env.VITE_INTLAYER_REQUIRED_LOCALES,
    strictMode: import.meta.env.VITE_INTLAYER_STRICT_MODE,
    defaultLocale: import.meta.env.VITE_INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: import.meta.env.VITE_INTLAYER_HEADER_NAME,
    cookieName: import.meta.env.VITE_INTLAYER_COOKIE_NAME,
    prefixDefault: import.meta.env.VITE_INTLAYER_PREFIX_DEFAULT,
    basePath: import.meta.env.VITE_INTLAYER_BASE_PATH,
    serverSetCookie: import.meta.env.VITE_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: import.meta.env.VITE_INTLAYER_NO_PREFIX,
    detectLocaleOnPrefetchNoPrefix: import.meta.env
      .VITE_INTLAYER_DETECT_LOCALE_ON_PREFETCH_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: import.meta.env.VITE_INTLAYER_FILE_EXTENSIONS,
    baseDir: import.meta.env.VITE_INTLAYER_BASE_DIR,
    contentDir: import.meta.env.VITE_INTLAYER_CONTENT_DIR,
    excludedPath: import.meta.env.VITE_INTLAYER_EXCLUDED_PATH,
    dictionariesDir: import.meta.env.VITE_INTLAYER_RESULT_DIR,
    masksDir: import.meta.env.VITE_INTLAYER_MASKS_DIR,
    moduleAugmentationDir: import.meta.env
      .VITE_INTLAYER_MODULE_AUGMENTATION_DIR,
    unmergedDictionariesDir: import.meta.env
      .VITE_INTLAYER_UNMERGED_DICTIONARIES_DIR,
    remoteDictionariesDir: import.meta.env
      .VITE_INTLAYER_REMOTE_DICTIONARIES_DIR,
    dynamicDictionariesDir: import.meta.env
      .VITE_INTLAYER_DYNAMIC_DICTIONARIES_DIR,
    fetchDictionariesDir: import.meta.env.VITE_INTLAYER_FETCH_DICTIONARIES_DIR,
    i18nextResourcesDir: import.meta.env.VITE_INTLAYER_I18N_DICTIONARIES_DIR,
    reactIntlMessagesDir: import.meta.env
      .VITE_INTLAYER_REACT_INTL_DICTIONARIES_DIR,
    typesDir: import.meta.env.VITE_INTLAYER_TYPE_DIR,
    mainDir: import.meta.env.VITE_INTLAYER_MAIN_DIR,
    configDir: import.meta.env.VITE_INTLAYER_CONFIG_DIR,
    watchedFilesPattern: import.meta.env.VITE_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath: import.meta.env
      .VITE_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath: import.meta.env
      .VITE_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: import.meta.env.VITE_INTLAYER_DICTIONARY_OUTPUT,
    watch: import.meta.env.VITE_INTLAYER_WATCH,
  };

  const editor: ReplaceValue<EditorConfig> = {
    applicationURL: import.meta.env.VITE_INTLAYER_APPLICATION_URL,
    editorURL: import.meta.env.VITE_INTLAYER_EDITOR_URL,
    cmsURL: import.meta.env.VITE_INTLAYER_CMS_URL,
    backendURL: import.meta.env.VITE_INTLAYER_BACKEND_URL,
    port: import.meta.env.VITE_INTLAYER_PORT,
    enabled: import.meta.env.VITE_INTLAYER_ENABLED,
    clientId: import.meta.env.VITE_INTLAYER_CLIENT_ID,
    clientSecret: import.meta.env.VITE_INTLAYER_CLIENT_SECRET,
    dictionaryPriorityStrategy: import.meta.env
      .VITE_INTLAYER_DICTIONARY_PRIORITY_STRATEGY,
    liveSync: import.meta.env.VITE_INTLAYER_LIVE_SYNC,
    liveSyncPort: import.meta.env.VITE_INTLAYER_LIVE_SYNC_PORT,
    liveSyncURL: import.meta.env.VITE_INTLAYER_LIVE_SYNC_URL,
  };

  const log: ReplaceValue<LogConfig> = {
    mode: import.meta.env.VITE_INTLAYER_LOG_MODE,
    prefix: import.meta.env.VITE_INTLAYER_LOG_PREFIX,
  };

  const ai: ReplaceValue<AiConfig> = {
    provider: import.meta.env.VITE_INTLAYER_AI_PROVIDER,
    model: import.meta.env.VITE_INTLAYER_AI_MODEL,
    temperature: import.meta.env.VITE_INTLAYER_AI_TEMPERATURE,
    apiKey: import.meta.env.VITE_INTLAYER_AI_API_KEY,
    applicationContext: import.meta.env.VITE_INTLAYER_AI_APPLICATION_CONTEXT,
  };

  const build: ReplaceValue<BuildConfig> = {
    optimize: import.meta.env.VITE_INTLAYER_BUILD_OPTIMIZE,
    importMode: import.meta.env.VITE_INTLAYER_BUILD_IMPORT_MODE,
    traversePattern: import.meta.env.VITE_INTLAYER_BUILD_TRAVERSE_PATTERN,
  };

  return {
    internationalization,
    middleware,
    content,
    editor,
    log,
    ai,
    build,
  };
};
