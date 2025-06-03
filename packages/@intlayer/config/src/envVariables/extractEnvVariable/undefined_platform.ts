import type {
  AiConfig,
  ContentConfig,
  EditorConfig,
  InternationalizationConfig,
  LogConfig,
  MiddlewareConfig,
} from '../../types/config';
import type { IntlayerConfigEnvVariable, ReplaceValue } from './types';

export const extractEmptyEnvVariable = (): IntlayerConfigEnvVariable => {
  const internationalization: ReplaceValue<InternationalizationConfig> = {
    locales: process.env.INTLAYER_LOCALES,
    requiredLocales: process.env.INTLAYER_REQUIRED_LOCALES,
    strictMode: process.env.INTLAYER_STRICT_MODE,
    defaultLocale: process.env.INTLAYER_DEFAULT_LOCALE,
  };

  const middleware: ReplaceValue<MiddlewareConfig> = {
    headerName: process.env.INTLAYER_HEADER_NAME,
    cookieName: process.env.INTLAYER_COOKIE_NAME,
    prefixDefault: process.env.INTLAYER_PREFIX_DEFAULT,
    basePath: process.env.INTLAYER_BASE_PATH,
    serverSetCookie: process.env.INTLAYER_SERVER_SET_COOKIE,
    noPrefix: process.env.INTLAYER_NO_PREFIX,
  };

  const content: ReplaceValue<ContentConfig> = {
    fileExtensions: process.env.INTLAYER_FILE_EXTENSIONS,
    baseDir: process.env.INTLAYER_BASE_DIR,
    contentDir: process.env.INTLAYER_CONTENT_DIR,
    excludedPath: process.env.INTLAYER_EXCLUDED_PATH,
    dictionariesDir: process.env.INTLAYER_RESULT_DIR,
    unmergedDictionariesDir: process.env.INTLAYER_UNMERGED_DICTIONARIES_DIR,
    dynamicDictionariesDir: process.env.INTLAYER_DYNAMIC_DICTIONARIES_DIR,
    moduleAugmentationDir: process.env.INTLAYER_MODULE_AUGMENTATION_DIR,
    i18nextResourcesDir: process.env.INTLAYER_I18N_DICTIONARIES_DIR,
    reactIntlMessagesDir: process.env.INTLAYER_REACT_INTL_DICTIONARIES_DIR,
    typesDir: process.env.INTLAYER_TYPE_DIR,
    mainDir: process.env.INTLAYER_MAIN_DIR,
    configDir: process.env.INTLAYER_CONFIG_DIR,
    watchedFilesPattern: process.env.INTLAYER_WATCHED_FILES_PATTERN,
    watchedFilesPatternWithPath:
      process.env.INTLAYER_WATCHED_FILES_PATTERN_WITH_PATH,
    outputFilesPatternWithPath:
      process.env.INTLAYER_OUTPUT_FILES_PATTERN_WITH_PATH,
    dictionaryOutput: process.env.INTLAYER_DICTIONARY_OUTPUT,
    watch: process.env.INTLAYER_WATCH,
  };

  const editor: ReplaceValue<EditorConfig> = {
    applicationURL: process.env.INTLAYER_APPLICATION_URL,
    editorURL: process.env.INTLAYER_EDITOR_URL,
    cmsURL: process.env.INTLAYER_CMS_URL,
    backendURL: process.env.INTLAYER_BACKEND_URL,
    port: process.env.INTLAYER_PORT,
    enabled: process.env.INTLAYER_ENABLED,
    clientId: process.env.INTLAYER_CLIENT_ID,
    clientSecret: process.env.INTLAYER_CLIENT_SECRET,
    dictionaryPriorityStrategy:
      process.env.INTLAYER_DICTIONARY_PRIORITY_STRATEGY,
    hotReload: process.env.INTLAYER_HOT_RELOAD,
  };

  const ai: ReplaceValue<AiConfig> = {
    provider: process.env.INTLAYER_AI_PROVIDER,
    model: process.env.INTLAYER_AI_MODEL,
    temperature: process.env.INTLAYER_AI_TEMPERATURE,
    apiKey: process.env.INTLAYER_AI_API_KEY,
    applicationContext: process.env.INTLAYER_AI_APPLICATION_CONTEXT,
  };

  const log: ReplaceValue<LogConfig> = {
    mode: process.env.INTLAYER_LOG_MODE,
    prefix: process.env.INTLAYER_LOG_PREFIX,
  };

  return {
    internationalization,
    middleware,
    content,
    editor,
    log,
    ai,
  };
};
