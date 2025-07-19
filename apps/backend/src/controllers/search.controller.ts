import * as askDocQuestionUtil from '@utils/AI/askDocQuestion/askDocQuestion';
import type { ResponseWithInformation } from '@utils/auth/getAuth';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { Request } from 'express';

export type SearchDocUtilParams = {
  input: string;
};
export type SearchDocUtilResult = ResponseData<string[]>;

export const searchDocUtil = async (
  req: Request<unknown, unknown, unknown, SearchDocUtilParams>,
  res: ResponseWithInformation<SearchDocUtilResult>
) => {
  const { input } = req.query;

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

  res.json(responseData);
};
