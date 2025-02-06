/* eslint-disable @typescript-eslint/no-explicit-any */
import { getConfiguration } from '@intlayer/config';
import { type Dictionary } from '@intlayer/core';
import { DictionaryStatus } from '@intlayer/editor';
import { writeContentDeclaration as writeContentDeclarationEditor } from '@intlayer/editor/server';
import { formatResponse, ResponseData } from '@utils/responseData';
import type { NextFunction, Request, Response } from 'express';

export type WriteContentDeclarationBody = Dictionary;
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
    const dictionaryData = req.body;

    // Clear unused schema
    if (dictionaryData['$schema']) {
      delete dictionaryData['$schema'];
    }

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
