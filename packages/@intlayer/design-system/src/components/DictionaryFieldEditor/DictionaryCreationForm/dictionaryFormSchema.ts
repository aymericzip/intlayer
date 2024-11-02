import { t } from 'react-intlayer';
import { z } from 'zod';

export const getDictionarySchema = (projectId: string) => {
  const requiredErrorName = t({
    en: 'Please enter a key for your dictionary',
    fr: 'Veuillez saisir une clef pour votre dictionaire',
    es: 'Por favor, ingrese un clave para su diccionario',
  });

  const invalidTypeErrorName = t({
    en: 'Please enter a valid key for your dictionary',
    fr: 'Veuillez saisir une clée valide pour votre dictionaire',
    es: 'Por favor, ingrese un clave válido para su diccionario',
  });

  const requiredErrorProjectId = t({
    en: 'Please select a project',
    fr: 'Veuillez sélectionner un projet',
    es: 'Por favor, seleccione un proyecto',
  });

  const invalidTypeErrorProjectId = t({
    en: 'Please select a valid project',
    fr: 'Veuillez sélectionner un projet valide',
    es: 'Por favor, seleccione un proyecto válido',
  });

  return z.object({
    key: z
      .string({
        required_error: requiredErrorName,
        invalid_type_error: invalidTypeErrorName,
      })
      .min(1, { message: invalidTypeErrorName })
      .default(''),
    projectIds: z
      .array(
        z.string({
          required_error: requiredErrorProjectId,
          invalid_type_error: invalidTypeErrorProjectId,
        })
      )
      .default([projectId]),
  });
};

export type DictionaryFormData = z.infer<
  ReturnType<typeof getDictionarySchema>
>;
