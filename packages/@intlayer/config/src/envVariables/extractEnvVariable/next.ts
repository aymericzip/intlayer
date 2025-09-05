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

export const extractNextEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: process.env.NEXT_PUBLIC_INTLAYER_LOCALES,
    requiredLocales: process.env.NEXT_PUBLIC_INTLAYER_REQUIRED_LOCALES,
    strictMode: process.env.NEXT_PUBLIC_INTLAYER_STRICT_MODE,
    defaultLocale: process.env.NEXT_PUBLIC_INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: process.env.NEXT_PUBLIC_INTLAYER_HEADER_NAME,
    cookieName: process.env.NEXT_PUBLIC_INTLAYER_COOKIE_NAME,
    prefixDefault: process.env.NEXT_PUBLIC_INTLAYER_PREFIX_DEFAULT,
    basePath: process.env.NEXT_PUBLIC_INTLAYER_BASE_PATH,
    serverSetCookie: process.env.NEXT_PUBLIC_INTLAYER_SERVER_SET_COOKIE,
    noPrefix: process.env.NEXT_PUBLIC_INTLAYER_NO_PREFIX,
    detectLocaleOnPrefetchNoPrefix:
      process.env.NEXT_PUBLIC_INTLAYER_DETECT_LOCALE_ON_PREFETCH_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: process.env.NEXT_PUBLIC_INTLAYER_FILE_EXTENSIONS,
    baseDir: process.env.NEXT_PUBLIC_INTLAYER_BASE_DIR,
    contentDir: process.env.NEXT_PUBLIC_INTLAYER_CONTENT_DIR,
    excludedPath: process.env.NEXT_PUBLIC_INTLAYER_EXCLUDED_PATH,
    dictionariesDir: process.env.NEXT_PUBLIC_INTLAYER_RESULT_DIR,
    dynamicDictionariesDir:
      process.env.NEXT_PUBLIC_INTLAYER_DYNAMIC_DICTIONARIES_DIR,
    unmergedDictionariesDir:
      process.env.NEXT_PUBLIC_INTLAYER_UNMERGED_DICTIONARIES_DIR,
    moduleAugmentationDir:
      process.env.NEXT_PUBLIC_INTLAYER_MODULE_AUGMENTATION_DIR,
    i18nextResourcesDir: process.env.NEXT_PUBLIC_INTLAYER_I18N_RESOURCES_DIR,
    reactIntlMessagesDir:
      process.env.NEXT_PUBLIC_INTLAYER_REACT_INTL_MESSAGES_DIR,
    mainDir: process.env.NEXT_PUBLIC_INTLAYER_MAIN_DIR,
    configDir: process.env.NEXT_PUBLIC_INTLAYER_CONFIG_DIR,
    typesDir: process.env.NEXT_PUBLIC_INTLAYER_TYPE_DIR,
    watchedFilesPattern: process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      process.env.NEXT_PUBLIC_INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      process.env.NEXT_PUBLIC_INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: process.env.NEXT_PUBLIC_INTLAYER_DICTIONARY_OUTPUT,
    watch: process.env.NEXT_PUBLIC_INTLAYER_WATCH,
  };

  const editor: ReplaceValue<EditorConfig> = {
    applicationURL: process.env.NEXT_PUBLIC_INTLAYER_APPLICATION_URL,
    editorURL: process.env.NEXT_PUBLIC_INTLAYER_EDITOR_URL,
    cmsURL: process.env.NEXT_PUBLIC_INTLAYER_CMS_URL,
    backendURL: process.env.NEXT_PUBLIC_INTLAYER_BACKEND_URL,
    enabled: process.env.NEXT_PUBLIC_INTLAYER_ENABLED,
    port: process.env.NEXT_PUBLIC_INTLAYER_PORT,
    clientId: process.env.NEXT_PUBLIC_INTLAYER_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_INTLAYER_CLIENT_SECRET,
    dictionaryPriorityStrategy:
      process.env.NEXT_PUBLIC_INTLAYER_DICTIONARY_PRIORITY_STRATEGY,
    liveSync: process.env.NEXT_PUBLIC_INTLAYER_LIVE_SYNC,
    liveSyncPort: process.env.NEXT_PUBLIC_INTLAYER_LIVE_SYNC_PORT,
    liveSyncURL: process.env.NEXT_PUBLIC_INTLAYER_LIVE_SYNC_URL,
  };

  const ai: ReplaceValue<AiConfig> = {
    provider: process.env.NEXT_PUBLIC_INTLAYER_AI_PROVIDER,
    model: process.env.NEXT_PUBLIC_INTLAYER_AI_MODEL,
    temperature: process.env.NEXT_PUBLIC_INTLAYER_AI_TEMPERATURE,
    apiKey: process.env.NEXT_PUBLIC_INTLAYER_AI_API_KEY,
    applicationContext: process.env.NEXT_PUBLIC_INTLAYER_AI_APPLICATION_CONTEXT,
  };

  const log: ReplaceValue<LogConfig> = {
    mode: process.env.NEXT_PUBLIC_INTLAYER_LOG_MODE,
    prefix: process.env.NEXT_PUBLIC_INTLAYER_LOG_PREFIX,
  };

  const build: ReplaceValue<BuildConfig> = {
    optimize: process.env.NEXT_PUBLIC_INTLAYER_BUILD_OPTIMIZE,
    importMode: process.env.NEXT_PUBLIC_INTLAYER_BUILD_IMPORT_MODE,
    traversePattern: process.env.NEXT_PUBLIC_INTLAYER_BUILD_TRAVERSE_PATTERN,
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
