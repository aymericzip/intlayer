import { getApp, getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';

export const getAppOrInit = () =>
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
