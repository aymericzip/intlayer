import bodyParser from 'body-parser';
import express, { type Request, type Response } from 'express';
import type { EditedContent } from '../client';
import { processEdition } from './processEdition';

const PORT = 4000;

export const startIntlayerEditor = () => {
  const app = express();

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
        await processEdition(editedContent);

        res.send({ success: true, editedContent });
      } catch (error) {
        console.error(error);
        res.status(500).send({ success: false });
      }
    }
  );

  app.listen(PORT, () => {
    console.info(
      `Intlayer editor server is running on http://localhost:${PORT}`
    );
  });
};
