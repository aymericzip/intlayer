const docs = {
  configuration: {
    en: require('./docs/configuration_en.md'),
    fr: require('./docs/configuration_fr.md'),
    es: require('./docs/configuration_es.md'),
  },
  interest_of_intlayer: {
    en: require('./docs/interest_of_intlayer_en.md'),
    fr: require('./docs/interest_of_intlayer_fr.md'),
    es: require('./docs/interest_of_intlayer_es.md'),
  },
  intlayer_cli: {
    en: require('./docs/intlayer_cli_en.md'),
    fr: require('./docs/intlayer_cli_fr.md'),
    es: require('./docs/intlayer_cli_es.md'),
  },
  intlayer_editor: {
    en: require('./docs/intlayer_editor_en.md'),
    fr: require('./docs/intlayer_editor_fr.md'),
    es: require('./docs/intlayer_editor_es.md'),
  },
  intlayer_with_create_react_app: {
    en: require('./docs/intlayer_with_create_react_app_en.md'),
    fr: require('./docs/intlayer_with_create_react_app_fr.md'),
    es: require('./docs/intlayer_with_create_react_app_es.md'),
  },
  intlayer_with_i18n: {
    en: require('./docs/intlayer_with_i18n_en.md'),
    fr: require('./docs/intlayer_with_i18n_fr.md'),
    es: require('./docs/intlayer_with_i18n_es.md'),
  },
  intlayer_with_nextjs: {
    en: require('./docs/intlayer_with_nextjs_en.md'),
    fr: require('./docs/intlayer_with_nextjs_fr.md'),
    es: require('./docs/intlayer_with_nextjs_es.md'),
  },
  intlayer_with_vite_react: {
    en: require('./docs/intlayer_with_vite+react_en.md'),
    fr: require('./docs/intlayer_with_vite+react_fr.md'),
    es: require('./docs/intlayer_with_vite+react_es.md'),
  },
  content_declaration__declaration_watching: {
    en: require('./docs/content_declaration/declaration_watching_en.md'),
    fr: require('./docs/content_declaration/declaration_watching_fr.md'),
    es: require('./docs/content_declaration/declaration_watching_es.md'),
  },
  content_declaration__enumeration: {
    en: require('./docs/content_declaration/enumeration_en.md'),
    fr: require('./docs/content_declaration/enumeration_fr.md'),
    es: require('./docs/content_declaration/enumeration_es.md'),
  },
  content_declaration__function_fetching: {
    en: require('./docs/content_declaration/function_fetching_en.md'),
    fr: require('./docs/content_declaration/function_fetching_fr.md'),
    es: require('./docs/content_declaration/function_fetching_es.md'),
  },
  content_declaration__get_started: {
    en: require('./docs/content_declaration/get_started_en.md'),
    fr: require('./docs/content_declaration/get_started_fr.md'),
    es: require('./docs/content_declaration/get_started_es.md'),
  },
  content_declaration__nested_id: {
    en: require('./docs/content_declaration/nested_id_en.md'),
    fr: require('./docs/content_declaration/nested_id_fr.md'),
    es: require('./docs/content_declaration/nested_id_es.md'),
  },
};

const getDocs = (lang) =>
  Object.fromEntries(
    Object.entries(docs).map(([key, value]) => [key, value[lang]])
  );

const getDoc = (docName, lang) => {
  const docs = getDocs(lang);
  return docs[docName];
};

module.exports = { getDoc, getDocs };
