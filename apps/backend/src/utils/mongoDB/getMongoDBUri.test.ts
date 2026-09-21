import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { getMongoDBUri } from './getMongoDBUri';

const ENVIRONMENT_KEYS = [
  'MONGODB_URI',
  'DB_ID',
  'DB_MDP',
  'DB_CLUSTER',
] as const;

let savedEnvironment: Partial<
  Record<(typeof ENVIRONMENT_KEYS)[number], string>
>;

beforeEach(() => {
  savedEnvironment = Object.fromEntries(
    ENVIRONMENT_KEYS.map((key) => [key, process.env[key]])
  );
  for (const key of ENVIRONMENT_KEYS) delete process.env[key];
});

afterEach(() => {
  for (const key of ENVIRONMENT_KEYS) {
    const value = savedEnvironment[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe('getMongoDBUri', () => {
  it('assembles the Atlas SRV URI from DB_ID / DB_MDP / DB_CLUSTER', () => {
    process.env.DB_ID = 'user';
    process.env.DB_MDP = 'secret';
    process.env.DB_CLUSTER = 'cluster0.abcde.mongodb.net';

    expect(getMongoDBUri()).toBe(
      'mongodb+srv://user:secret@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    );
  });

  it('prefers MONGODB_URI over the Atlas credentials', () => {
    process.env.DB_ID = 'user';
    process.env.DB_MDP = 'secret';
    process.env.DB_CLUSTER = 'cluster0.abcde.mongodb.net';
    process.env.MONGODB_URI = 'mongodb://mongo:27017/intlayer?replicaSet=rs0';

    expect(getMongoDBUri()).toBe(
      'mongodb://mongo:27017/intlayer?replicaSet=rs0'
    );
  });

  it('ignores a blank MONGODB_URI', () => {
    process.env.DB_ID = 'user';
    process.env.DB_MDP = 'secret';
    process.env.DB_CLUSTER = 'cluster0.abcde.mongodb.net';
    process.env.MONGODB_URI = '   ';

    expect(getMongoDBUri()).toMatch(/^mongodb\+srv:\/\/user:secret@/);
  });
});
