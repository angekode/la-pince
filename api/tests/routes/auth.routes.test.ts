import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';


const apiUrl = `http://localhost:${process.env.PORT}`;

describe('server connexion', () => {
  it('/ should respond', async () => {
    // Act
    const response = await fetch(apiUrl);
    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
  });
});