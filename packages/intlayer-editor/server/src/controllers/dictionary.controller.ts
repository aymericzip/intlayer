import { getConfiguration } from '@intlayer/config';
import { type Dictionary } from '@intlayer/core';
import type { DictionaryStatus } from '@intlayer/editor';
import { writeContentDeclaration as writeContentDeclarationEditor } from '@intlayer/editor/server';
import { type ResponseData, formatResponse } from '@utils/responseData';
import type { NextFunction, Request, Response } from 'express';

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

    const formattedResponse = formatResponse<WriteContentDeclarationResultData>(
      {
        data: result,
      }
    );

    res.json(formattedResponse);
    return;
  } catch (err) {
    const errorMessage =
      (err as { message?: string; status?: number }) ?? 'Internal Server Error';

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
