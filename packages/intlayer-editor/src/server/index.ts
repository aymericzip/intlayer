import { getConfiguration } from '@intlayer/config';
import bodyParser from 'body-parser';
import express, { type Request, type Response } from 'express';
import type { EditedContent } from '../client';
import { editContent } from './content-editor';

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
      req: Request<undefined, undefined, EditedContent>,
      res: Response
    ) => {
      const editedContent = req.body;

      try {
        await editContent(editedContent);

        res.send({ success: true, editedContent });
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
