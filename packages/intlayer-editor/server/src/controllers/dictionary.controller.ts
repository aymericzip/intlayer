import {
  writeContentDeclaration as writeContentDeclarationEditor,
  type DictionaryStatus,
} from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import { type Dictionary } from '@intlayer/core';
import dictionaries from '@intlayer/dictionaries-entry';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { NextFunction, Request, Response } from 'express';
import { t } from 'express-intlayer';

type GetDictionariesResult = ResponseData<Record<string, Dictionary>>;

/**
 * Get the Intlayer configuration
 */
export const getDictionaries = async (
  req: Request,
  res: Response<GetDictionariesResult>,
  _next: NextFunction
): Promise<void> => {
  try {
    const formattedResponse = formatResponse<Record<string, Dictionary>>({
      data: dictionaries,
    });

    res.json(formattedResponse);
    return;
  } catch (err) {
    const errorMessage = (err as { message?: string; status?: number }) ?? {
      message: 'Internal Server Error',
      status: 500,
    };

    const formattedErrorResponse = formatResponse<Record<string, Dictionary>>({
      error: {
        message: errorMessage.message ?? 'Internal Server Error',
        code: 'INTERNAL_SERVER_ERROR',
        title: 'Internal Server Error',
      },
      status: errorMessage.status ?? 500,
    });

    res.json(formattedErrorResponse);
    return;
  }
};

export type WriteContentDeclarationBody = { dictionary: Dictionary };
type WriteContentDeclarationResultData = {
  status: DictionaryStatus;
  path: string;
};
export type WriteContentDeclarationResult =
  ResponseData<WriteContentDeclarationResultData>;

/**
 * Adds a new dictionary to the database.
 */
export const writeContentDeclaration = async (
  req: Request<any, any, WriteContentDeclarationBody>,
  res: Response<WriteContentDeclarationResult>,
  _next: NextFunction
): Promise<void> => {
  try {
    const dictionaryData = req.body.dictionary;

    const config = getConfiguration();

    const result = await writeContentDeclarationEditor(dictionaryData, config);

    let description = '';

    switch (result.status) {
      case 'updated': {
        description = t({
          en: 'Content declaration updated successfully',
          fr: 'Déclaration de contenu mise à jour avec succès',
          es: 'Declaración de contenido actualizada con éxito',
        });
        break;
      }
      case 'reimported in JSON': {
        description = t({
          en: 'Content declaration reimported in JSON successfully',
          fr: 'Déclaration de contenu réimportée en JSON avec succès',
          es: 'Declaración de contenido reimportada en JSON con éxito',
        });
        break;
      }
      case 'reimported in new location': {
        description = t({
          en: 'Content declaration reimported in new location successfully',
          fr: 'Déclaration de contenu réimportée dans un nouveau emplacement avec succès',
          es: 'Declaración de contenido reimportada en un nuevo lugar con éxito',
        });
        break;
      }
      default: {
        description = t({
          en: 'Content declaration written successfully',
          fr: 'Déclaration de contenu écrite avec succès',
          es: 'Declaración de contenido escrita con éxito',
        });
        break;
      }
    }

    const formattedResponse = formatResponse<WriteContentDeclarationResultData>(
      {
        data: result,
        message: t({
          en: 'Content declaration written',
          fr: 'Déclaration de contenu écrite',
          es: 'Declaración de contenido escrita',
        }),
        description: t({
          en: 'Content declaration written successfully',
          fr: 'Déclaration de contenu écrite avec succès',
          es: 'Declaración de contenido escrita con éxito',
        }),
      }
    );

    res.json(formattedResponse);
    return;
  } catch (err) {
    const errorMessage = (err as { message?: string; status?: number }) ?? {
      message: 'Internal Server Error',
      status: 500,
    };

    console.error(errorMessage);

    const formattedErrorResponse =
      formatResponse<WriteContentDeclarationResultData>({
        error: {
          message: errorMessage.message ?? 'Internal Server Error',
          code: 'INTERNAL_SERVER_ERROR',
          title: 'Internal Server Error',
        },
        status: errorMessage.status ?? 500,
      });

    res.json(formattedErrorResponse);
    return;
  }
};
