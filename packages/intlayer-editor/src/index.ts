import { getConfiguration } from '@intlayer/config';
import bodyParser from 'body-parser';
import express, { type Request, type Response } from 'express';
import { editContent } from './content-editor';

export const startIntlayerEditor = () => {
  const app = express();
  const {
    editor: { port },
  } = getConfiguration();

  interface EditContentBody {
    filePath: string;
    keyPath: string;
    newValue: string;
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.post('/', async (req: Request<EditContentBody>, res: Response) => {
    const { filePath, keyPath, newValue } = req.body;

    const keyPathArray: string[] = keyPath.split('.');

    const parsedNewValue: string = newValue;

    try {
      await editContent(filePath, keyPathArray, parsedNewValue);

      res.send({ success: true, filePath });
    } catch (error) {
      console.error(error);
      res.status(500).send({ success: false });
    }
  });

  app.listen(port, () => {
    console.info(
      `Intlayer editor server is running on http://localhost:${port}`
    );
  });
};
