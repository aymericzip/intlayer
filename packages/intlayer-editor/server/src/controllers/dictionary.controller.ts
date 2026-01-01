import {
  type DictionaryStatus,
  writeContentDeclaration as writeContentDeclarationEditor,
} from '@intlayer/chokidar';
import { getConfiguration } from '@intlayer/config';
import type { Dictionary } from '@intlayer/types';
import {
  getUnmergedDictionaries,
  type UnmergedDictionaries,
} from '@intlayer/unmerged-dictionaries-entry';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { t } from 'fastify-intlayer';

type GetDictionariesResult = ResponseData<UnmergedDictionaries>;

/**
 * Get the Intlayer configuration
 */
export const getDictionaries = async (
  _req: FastifyRequest,
  res: FastifyReply
): Promise<void> => {
  try {
    const formattedResponse = formatResponse<UnmergedDictionaries>({
      data: getUnmergedDictionaries(),
    });

    return res.send(formattedResponse);
  } catch (err) {
    const errorMessage = (err as { message?: string; status?: number }) ?? {
      message: 'Internal Server Error',
      status: 500,
    };

    const formattedErrorResponse = formatResponse<UnmergedDictionaries>({
      error: {
        message: errorMessage.message ?? 'Internal Server Error',
        code: 'INTERNAL_SERVER_ERROR',
        title: 'Internal Server Error',
      },
      status: errorMessage.status ?? 500,
    });

    return res.send(formattedErrorResponse);
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
  req: FastifyRequest<{ Body: WriteContentDeclarationBody }>,
  res: FastifyReply
): Promise<void> => {
  try {
    const dictionaryData = req.body.dictionary;

    const config = getConfiguration();

    const result = await writeContentDeclarationEditor(dictionaryData, config);

    let description = '';

    switch (result.status) {
      case 'created': {
        description = t({
          en: 'Content declaration created successfully',
          fr: 'Déclaration de contenu créée avec succès',
          es: 'Declaración de contenido creada con éxito',
        });
        break;
      }

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
      case 'new content file': {
        description = t({
          en: 'Content declaration new content file successfully',
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
        description,
      }
    );

    return res.send(formattedResponse);
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

    return res.send(formattedErrorResponse);
  }
};
