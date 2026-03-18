import { describe, it } from 'node:test';
import assert from 'node:assert';
import { prisma } from '../../src/db/prisma-client';

const skip = true;

describe('db connection', { skip }, () => {
  it('should connect', async () => {
    await prisma.$connect();
  });
});

describe('user table', { skip }, () => {
  it('should create user', async () => {
    // Arrange
    const newUser = { firstname: 'Alice', lastname: 'Dupond', email: 'alice@example.com', password: 'password' };
    // Act 
    const userCreated = await prisma.user.create({ data: newUser });
    const findResult = await prisma.user.findUnique({ where : { id: userCreated.id } });
    // Assert
    assert.notStrictEqual(findResult, null);
    assert.strictEqual(findResult!.id, userCreated.id);
    assert.strictEqual(findResult!.firstname, newUser.firstname);
    assert.strictEqual(findResult!.lastname, newUser.lastname);
    assert.strictEqual(findResult!.email, userCreated.email);
    assert.strictEqual(findResult!.password, userCreated.password);
  });
});