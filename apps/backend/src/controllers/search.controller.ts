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

  if (!input || typeof input !== 'string') {
    res.status(400).json(formatResponse({ error: 'Missing search input' }));
    return;
  }

  // Search for top 30 chunks via embeddings
  const response = await askDocQuestionUtil.searchChunkReference(
    input,
    30,
    0.2
  );

  const docScores = new Map<string, number[]>();

  for (const doc of response) {
    if (!doc.fileKey || typeof doc.similarity !== 'number') continue;
    if (!docScores.has(doc.fileKey)) docScores.set(doc.fileKey, []);
    docScores.get(doc.fileKey)!.push(doc.similarity);
  }

  // Compute average similarity per document
  const docAverages: SearchDocResult[] = Array.from(docScores.entries()).map(
    ([fileKey, scores]) => ({
      fileKey,
      similarityScore: scores.reduce((a, b) => a + b, 0) / (scores.length || 1),
    })
  );

  // Sort descending by relevance
  docAverages.sort((a, b) => b.similarityScore - a.similarityScore);

  const responseData = formatResponse<SearchDocResult[]>({
    data: docAverages.slice(0, 30),
  });

  res.json(responseData);
};
