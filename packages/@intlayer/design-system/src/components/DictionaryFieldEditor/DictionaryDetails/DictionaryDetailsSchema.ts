// @ts-ignore react-intlayer not build yet
import { t } from 'react-intlayer';
import { z } from 'zod';

export const getDictionaryDetailsSchema = (projectId: string) => {
  // Title Field Error Messages
  const titleRequiredError = t({
    en: 'Please enter a name for your organization.',
    fr: 'Veuillez saisir un nom pour votre organisation.',
    es: 'Por favor, ingrese un nombre para su organización.',
  });

  const titleInvalidTypeError = t({
    en: 'The organization name must be a valid string.',
    fr: 'Le nom de votre organisation doit être une chaîne valide.',
    es: 'El nombre de su organización debe ser una cadena válida.',
  });

  const titleMinLengthError = t({
    en: 'The organization name must be at least 4 characters long.',
    fr: 'Le nom de votre organisation doit comporter au moins 4 caractères.',
    es: 'El nombre de su organización debe tener al menos 4 caracteres.',
  });

  // Key Field Error Messages
  const keyRequiredError = t({
    en: 'Please enter a key for your organization.',
    fr: 'Veuillez saisir une clé pour votre organisation.',
    es: 'Por favor, ingrese una clave para su organización.',
  });

  const keyInvalidTypeError = t({
    en: 'The key must be a valid string.',
    fr: 'La clé doit être une chaîne valide.',
    es: 'La clave debe ser una cadena válida.',
  });

  const keySpaceError = t({
    en: 'The key cannot contain spaces or special characters.',
    fr: "La clé ne peut pas contenir d'espaces ou de caractères spéciaux.",
    es: 'La clave no puede contener espacios o caracteres especiales.',
  });

  const keyMinLengthError = t({
    en: 'The key must be at least 4 characters long.',
    fr: 'La clé doit comporter au moins 4 caractères.',
    es: 'La clave debe tener al menos 4 caracteres.',
  });

  // Description Field Error Messages
  const descriptionRequiredError = t({
    en: 'Please enter a description for your organization.',
    fr: 'Veuillez saisir une description pour votre organisation.',
    es: 'Por favor, ingrese una descripción para su organización.',
  });

  const descriptionInvalidTypeError = t({
    en: 'The description must be a valid string.',
    fr: 'La description doit être une chaîne valide.',
    es: 'La descripción debe ser una cadena válida.',
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
    title: z
      .string({
        required_error: titleRequiredError,
        invalid_type_error: titleInvalidTypeError,
      })
      // Can be length of 0 or > 4
      .refine((val) => val.length === 0 || val.length >= 4, {
        message: titleMinLengthError,
      })
      .optional(),
    key: z
      .string({
        required_error: keyRequiredError,
        invalid_type_error: keyInvalidTypeError,
      })
      .min(4, { message: keyMinLengthError })
      /**
       * Valid :
       * my-key
       * my_key
       *
       * Invalid :
       * my key
       * my.key
       */
      .regex(/^[a-zA-Z0-9-_]+$/, { message: keySpaceError })
      .default(''),
    description: z
      .string({
        required_error: descriptionRequiredError,
        invalid_type_error: descriptionInvalidTypeError,
      })
      .optional(),
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

export type DictionaryDetailsFormData = z.infer<
  ReturnType<typeof getDictionaryDetailsSchema>
>;
