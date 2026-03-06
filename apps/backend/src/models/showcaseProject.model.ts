import { showcaseProjectSchema } from '@schemas/showcaseProject.schema';
import { model } from 'mongoose';
import type {
  ShowcaseProjectDocument,
  ShowcaseProjectModelType,
} from '@/types/showcaseProject.types';

export const ShowcaseProjectModel = model<
  ShowcaseProjectDocument,
  ShowcaseProjectModelType
>('ShowcaseProject', showcaseProjectSchema);
