import { getConfiguration } from '@intlayer/config';
import bodyParser from 'body-parser';
import express, { type Request, type Response } from 'express';
import { editContent } from './content-editor';
import type { KeyPath } from './types';

export type { KeyPath };

type EditContentBody = {
  dictionaryPath: string;
  keyPath: KeyPath[];
  newValue: string;
};

export const startIntlayerEditor = () => {
  const app = express();
  const {
    editor: { port },
  } = getConfiguration();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post(
    '/',
    async (
      req: Request<undefined, undefined, EditContentBody>,
      res: Response
    ) => {
      const { dictionaryPath, keyPath, newValue } = req.body;

      try {
        await editContent(dictionaryPath, keyPath, newValue);

        res.send({ success: true, dictionaryPath });
      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false });
      }
    }
  );

  app.listen(port, () => {
    console.info(
      `Intlayer editor server is running on http://localhost:${port}`
    );
  });
};
