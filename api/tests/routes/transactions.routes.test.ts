import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';


import { 
  postObject,
  createNewUser, 
  generateRandomUserInfo, 
  seedCategories,
  seedTransactions,
  apiUrl,
  transactionsToCreate
} from '../tools';
import { ref } from 'node:process';

/**
 * Il faut que la base de données soit vierge pour réaliser ces tests (à faire dans le setup.js).
 */

const skip = true; // tant que les routes ne sont pas implémentés


/**
 * GET /transactions
 */
describe('GET /transactions', { skip }, () => {

  it('should return transactions list for user', async () => {
    // Arrange
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);
    const transactions = await seedTransactions(user.id, categories[0].id);

    // Act
    const response = await fetch(`${apiUrl}/transactions`, {
      headers: { 'Cookie' : `token=${token}`}
    });
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.strictEqual(responseBody.count, transactions.length);
    assert.strictEqual(responseBody.transactions.length, responseBody.count);
    for (const responseTransaction of responseBody.transactions) {
      // le nom correspond à une transaction existante ?
      const refTransaction = transactions.find(t => t.id === responseTransaction.id);
      assert.ok(refTransaction);
      assert.strictEqual(refTransaction.label, responseTransaction.label);
      assert.strictEqual(refTransaction.amount, responseTransaction.amount);
      assert.strictEqual(refTransaction.date.toISOString(), responseTransaction.date);
      assert.strictEqual(refTransaction.categoryId, responseTransaction.categoryId);
      assert.strictEqual(refTransaction.userId, responseTransaction.userId);
    }
  });
});


/**
 * GET /transactions/:id
 */
describe('GET /transactions/:id', { skip }, () => {

  it('should return one transaction', async () => {
    // Arrange
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);
    const transactions = await seedTransactions(user.id, categories[0].id);

    // Act
    const response = await fetch(`${apiUrl}/transactions/${transactions[0].id}`, {
      headers: { 'Cookie' : `token=${token}`}
    });
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    const refTransaction = transactions.find(t => t.id === responseBody.id);
    assert.ok(refTransaction);
    assert.strictEqual(refTransaction.label, responseBody.label);
    assert.strictEqual(refTransaction.amount, responseBody.amount);
    assert.strictEqual(refTransaction.date.toISOString(), responseBody.date);
    assert.strictEqual(refTransaction.categoryId, responseBody.categoryId);
    assert.strictEqual(refTransaction.userId, responseBody.userId);
  });
});


/**
 * POST /transactions
 */
describe('POST /transactions', { skip }, () => {

  it('should create one transaction', async () => {
    // Arrange
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);
    const newTransaction = { ...transactionsToCreate[0], userId: user.id, categoryId: categories[0].id };

    // Act
    const response = await fetch(
      `${apiUrl}/transactions`,
      {
        method: 'POST',
        headers: { 
          'Cookie' : `token=${token}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newTransaction)
      }
    );
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.CREATED);
    assert.ok(newTransaction);
    assert.strictEqual(newTransaction.label, responseBody.label);
    assert.strictEqual(newTransaction.amount, responseBody.amount);
    assert.strictEqual(newTransaction.date.toISOString(), responseBody.date);
    assert.strictEqual(newTransaction.categoryId, responseBody.categoryId);
    assert.strictEqual(newTransaction.userId, responseBody.userId);
  });
});


/**
 * PATCH /transactions/:id
 */
describe('PATCH /transactions/:id', { skip }, () => {

  it('should update one transaction', async () => {
    // Arrange
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);
    const transactions = await seedTransactions(user.id, categories[0].id);
    const existingTransaction = transactions[0];
    const updatedTransaction = { ...existingTransaction, amount: 999.99 };

    // Act
    const response = await fetch(
      `${apiUrl}/transactions/${existingTransaction.id}`,
      {
        method: 'PATCH',
        headers: { 
          'Cookie' : `token=${token}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(updatedTransaction)
      }
    );
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.ok(responseBody);
    /*
    assert.strictEqual(updatedTransaction.label, responseBody.label);
    assert.strictEqual(updatedTransaction.amount, responseBody.amount);
    assert.strictEqual(updatedTransaction.date.toISOString(), responseBody.date);
    assert.strictEqual(updatedTransaction.categoryId, responseBody.categoryId);
    assert.strictEqual(updatedTransaction.userId, responseBody.userId);
    */
  });
});