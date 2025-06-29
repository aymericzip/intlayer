import { readFileContent } from './readFileContent';

const fequentQuestions = {
  build_dictionaries: readFileContent(
    '/frequent_questions/build_dictionaries.md'
  ),
  esbuild_error: readFileContent('/frequent_questions/esbuild_error.md'),
  static_rendering: readFileContent('/frequent_questions/static_rendering.md'),
  domain_routing: readFileContent('/frequent_questions/domain_routing.md'),
  intlayer_command_undefined: readFileContent(
    '/frequent_questions/intlayer_command_undefined.md'
  ),
  unknown_command: readFileContent('/frequent_questions/unknown_command.md'),
  locale_incorect_in_url: readFileContent(
    '/frequent_questions/locale_incorect_in_url.md'
  ),
  get_locale_cookie: readFileContent(
    '/frequent_questions/get_locale_cookie.md'
  ),
  ssr_next_no_locale: readFileContent(
    '/frequent_questions/SSR_Next_no_[locale].md'
  ),
  array_as_content_declaration: readFileContent(
    '/frequent_questions/array_as_content_declaration.md'
  ),
  translated_path_url: readFileContent(
    '/frequent_questions/translated_path_url.md'
  ),
  customized_locale_list: readFileContent(
    '/frequent_questions/customized_locale_list.md'
  ),
};

export const getFequentQuestions = async () => {
  const fequentQuestionsEntries = await Promise.all(
    Object.entries(fequentQuestions).map(async ([key, value]) => [
      key,
      await value,
    ])
  );

  return Object.fromEntries(fequentQuestionsEntries);
};
