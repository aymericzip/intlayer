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

export const extractReactAppEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: process.env.REACT_APP_INTLAYER_LOCALES,
    requiredLocales: process.env.REACT_APP_INTLAYER_REQUIRED_LOCALES,
    strictMode: process.env.REACT_APP_INTLAYER_STRICT_MODE,
    defaultLocale: process.env.REACT_APP_INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: process.env.REACT_APP_INTLAYER_HEADER_NAME,
    cookieName: process.env.REACT_APP_INTLAYER_COOKIE_NAME,
    prefixDefault: process.env.REACT_APP_INTLAYER_PREFIX_DEFAULT,
    basePath: process.env.REACT_APP_INTLAYER_BASE_PATH,
    serverSetCookie: process.env.REACT_APP_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: process.env.REACT_APP_INTLAYER_NO_PREFIX,
    detectLocaleOnPrefetchNoPrefix:
      process.env.REACT_APP_INTLAYER_DETECT_LOCALE_ON_PREFETCH_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: process.env.REACT_APP_INTLAYER_FILE_EXTENSIONS,
    baseDir: process.env.REACT_APP_INTLAYER_BASE_DIR,
    contentDir: process.env.REACT_APP_INTLAYER_CONTENT_DIR,
    excludedPath: process.env.REACT_APP_INTLAYER_EXCLUDED_PATH,
    unmergedDictionariesDir:
      process.env.REACT_APP_INTLAYER_UNMERGED_DICTIONARIES_DIR,
    dictionariesDir: process.env.REACT_APP_INTLAYER_RESULT_DIR,
    dynamicDictionariesDir:
      process.env.REACT_APP_INTLAYER_DYNAMIC_DICTIONARIES_DIR,
    fetchDictionariesDir: process.env.REACT_APP_INTLAYER_FETCH_DICTIONARIES_DIR,
    moduleAugmentationDir:
      process.env.REACT_APP_INTLAYER_MODULE_AUGMENTATION_DIR,
    i18nextResourcesDir: process.env.REACT_APP_INTLAYER_I18N_DICTIONARIES_DIR,
    reactIntlMessagesDir:
      process.env.REACT_APP_INTLAYER_REACT_INTL_DICTIONARIES_DIR,
    typesDir: process.env.REACT_APP_INTLAYER_TYPE_DIR,
    mainDir: process.env.REACT_APP_INTLAYER_MAIN_DIR,
    configDir: process.env.REACT_APP_INTLAYER_CONFIG_DIR,
    watchedFilesPattern: process.env.REACT_APP_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      process.env.REACT_APP_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      process.env.REACT_APP_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: process.env.REACT_APP_INTLAYER_DICTIONARY_OUTPUT,
    watch: process.env.REACT_APP_INTLAYER_WATCH,
  };

  const editor: ReplaceValue<EditorConfig> = {
    applicationURL: process.env.REACT_APP_INTLAYER_APPLICATION_URL,
    editorURL: process.env.REACT_APP_INTLAYER_EDITOR_URL,
    cmsURL: process.env.REACT_APP_INTLAYER_CMS_URL,
    backendURL: process.env.REACT_APP_INTLAYER_BACKEND_URL,
    port: process.env.REACT_APP_INTLAYER_PORT,
    enabled: process.env.REACT_APP_INTLAYER_ENABLED,
    clientId: process.env.REACT_APP_INTLAYER_CLIENT_ID,
    clientSecret: process.env.REACT_APP_INTLAYER_CLIENT_SECRET,
    dictionaryPriorityStrategy:
      process.env.REACT_APP_INTLAYER_DICTIONARY_PRIORITY_STRATEGY,
    liveSync: process.env.REACT_APP_INTLAYER_LIVE_SYNC,
    liveSyncPort: process.env.REACT_APP_INTLAYER_LIVE_SYNC_PORT,
    liveSyncURL: process.env.REACT_APP_INTLAYER_LIVE_SYNC_URL,
  };

  const log: ReplaceValue<LogConfig> = {
    mode: process.env.REACT_APP_INTLAYER_LOG_MODE,
    prefix: process.env.REACT_APP_INTLAYER_LOG_PREFIX,
  };

  const ai: ReplaceValue<AiConfig> = {
    provider: process.env.REACT_APP_INTLAYER_AI_PROVIDER,
    model: process.env.REACT_APP_INTLAYER_AI_MODEL,
    temperature: process.env.REACT_APP_INTLAYER_AI_TEMPERATURE,
    apiKey: process.env.REACT_APP_INTLAYER_AI_API_KEY,
    applicationContext: process.env.REACT_APP_INTLAYER_AI_APPLICATION_CONTEXT,
  };

  const build: ReplaceValue<BuildConfig> = {
    optimize: process.env.REACT_APP_INTLAYER_BUILD_OPTIMIZE,
    importMode: process.env.REACT_APP_INTLAYER_BUILD_IMPORT_MODE,
    traversePattern: process.env.REACT_APP_INTLAYER_BUILD_TRAVERSE_PATTERN,
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
