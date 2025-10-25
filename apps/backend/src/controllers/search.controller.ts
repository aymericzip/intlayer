import * as askDocQuestionUtil from '@utils/AI/askDocQuestion/askDocQuestion';
import { formatResponse, type ResponseData } from '@utils/responseData';
import type { Request, Response } from 'express';

export type SearchDocUtilParams = {
  input: string;
};

export type SearchDocResult = {
  fileKey: string;
  similarityScore: number;
};

export type SearchDocUtilResult = ResponseData<SearchDocResult[]>;

export const searchDocUtil = async (
  req: Request<unknown, unknown, unknown, SearchDocUtilParams>,
  res: Response<SearchDocUtilResult>
) => {
  const { input } = req.query;

  // Ask the embedding search util for top 30 chunks
  const response = await askDocQuestionUtil.searchChunkReference(
    input,
    30,
    0.2
  );

  // Aggregate scores by file (since multiple chunks may come from same file)
  const docScores = new Map<string, number[]>();

  for (const doc of response) {
    if (!doc.fileKey || typeof doc.similarity !== 'number') continue;
    if (!docScores.has(doc.fileKey)) docScores.set(doc.fileKey, []);
    docScores.get(doc.fileKey)!.push(doc.similarity);
  }

  // Compute average similarity per file
  const docAverages: SearchDocResult[] = Array.from(docScores.entries()).map(
    ([fileKey, scores]) => ({
      fileKey,
      similarityScore: scores.reduce((a, b) => a + b, 0) / scores.length,
    })
  );

  // Sort by descending similarity
  docAverages.sort((a, b) => b.similarityScore - a.similarityScore);

  // Respond with top N unique files + scores
  const responseData = formatResponse<SearchDocResult[]>({
    data: docAverages.slice(0, 30),
  });

  res.json(responseData);
};
