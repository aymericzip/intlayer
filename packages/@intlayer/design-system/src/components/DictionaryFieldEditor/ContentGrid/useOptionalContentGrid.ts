'use client';

import { useContext } from 'react';
import {
  ContentGridContext,
  type ContentGridModel,
} from './ContentGridContext';

/**
 * Reads the grid model when rendered under `ContentGridProvider`, `undefined`
 * otherwise (e.g. a `SaveForm` placed outside the editor).
 */
export const useOptionalContentGrid = (): ContentGridModel | undefined =>
  useContext(ContentGridContext);
