import { readFileFunction } from './common';

const fequentQuestions = {
  build_dictionaries: readFileFunction(
    '/frequent_questions/build_dictionaries.md'
  ),
  esbuild_error: readFileFunction('/frequent_questions/esbuild_error.md'),
  static_rendering: readFileFunction('/frequent_questions/static_rendering.md'),
  domain_routing: readFileFunction('/frequent_questions/domain_routing.md'),
  intlayer_command_undefined: readFileFunction(
    '/frequent_questions/intlayer_command_undefined.md'
  ),
  unknown_command: readFileFunction('/frequent_questions/unknown_command.md'),
  locale_incorect_in_url: readFileFunction(
    '/frequent_questions/locale_incorect_in_url.md'
  ),
  get_locale_cookie: readFileFunction(
    '/frequent_questions/get_locale_cookie.md'
  ),
  ssr_next_no_locale: readFileFunction(
    '/frequent_questions/SSR_Next_no_[locale].md'
  ),
  array_as_content_declaration: readFileFunction(
    '/frequent_questions/array_as_content_declaration.md'
  ),
  translated_path_url: readFileFunction(
    '/frequent_questions/translated_path_url.md'
  ),
  customized_locale_list: readFileFunction(
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
