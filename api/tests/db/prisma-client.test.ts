import { describe, it } from 'node:test';
import assert from 'node/assert';
import { prisma } from '../../src/db/prisma-client';


describe('db connection', () => {
  it('should connect', async () => {
    await prisma.$connect();
  });
});

describe('db connection', () => {
  it('should connect', async () => {
    await prisma.$connect();
  });
});