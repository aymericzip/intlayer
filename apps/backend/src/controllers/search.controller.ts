import * as askDocQuestionUtil from '@utils/AI/askDocQuestion/askDocQuestion';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { FastifyReply, FastifyRequest } from 'fastify';

export type SearchDocUtilParams = {
  input: string;
};
export type SearchDocUtilResult = ResponseData<string[]>;

export const searchDocUtil = async (
  request: FastifyRequest<{ Querystring: SearchDocUtilParams }>,
  reply: FastifyReply
) => {
  const { input } = request.query;

  const response = await askDocQuestionUtil.searchChunkReference(
    input,
    30,
    0.2
  );
  const docFileList = response.map((doc) => doc.fileKey);

  const uniqueDocFileList = Array.from(new Set(docFileList));

  const responseData = formatResponse<string[]>({
    data: uniqueDocFileList,
  });

  reply.send(responseData);
};
