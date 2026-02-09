import * as askDocQuestionUtil from '@utils/AI/askDocQuestion/askDocQuestion';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type SearchDocUtilParams = {
  input: string;
  limit?: string;
  returnContent?: string;
};

export type SearchDocResult = {
  fileKey: string;
  chunkNumber: number;
  content?: string;
  docUrl: string;
  docName: string;
};

export type SearchDocUtilResult = ResponseData<string[] | SearchDocResult[]>;

export const searchDocUtil = async (
  request: FastifyRequest<{ Querystring: SearchDocUtilParams }>,
  reply: FastifyReply
) => {
  const { input, limit, returnContent } = request.query;

  const maxResults = limit ? Number.parseInt(limit, 10) : 30;
  const shouldReturnContent = returnContent === 'true';

  const response = await askDocQuestionUtil.searchChunkReference(
    input,
    maxResults,
    0.2
  );

  if (shouldReturnContent) {
    const searchResults: SearchDocResult[] = response.map((doc) => ({
      fileKey: doc.fileKey,
      chunkNumber: doc.chunkNumber,
      content: doc.content,
      docUrl: doc.docUrl,
      docName: doc.docName,
    }));

    const responseData = formatResponse<SearchDocResult[]>({
      data: searchResults,
    });

    return reply.send(responseData);
  }

  const docFileList = response.map((doc) => doc.fileKey);

  const uniqueDocFileList = Array.from(new Set(docFileList));

  const responseData = formatResponse<string[]>({
    data: uniqueDocFileList,
  });

  return reply.send(responseData);
};
