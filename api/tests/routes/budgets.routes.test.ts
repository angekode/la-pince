import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../src/db/prisma-client';
import zod from 'zod';


import { 
  postObject,
  extractTokenFromCookie,
  createNewUser, 
  generateRandomUserInfo, 
  seedCategories, 
  seedBudgets,
  apiUrl
} from '../tools';
import { ref } from 'node:process';



const apiBudgetItemScheme = zod.object({
  id: zod.number(),
  limit: zod.number(),
  categoryId: zod.number()
});

const apiBudgetListBodyScheme = zod.object({
  count: zod.number(),
  budgets: zod.array(apiBudgetItemScheme)
});

describe('GET /budgets', () => {
  it('should return all budgets from user', async () => {
    // Arrange 
    const { user, token } = await createNewUser();
    const categories = await seedCategories();
    const budgets = await seedBudgets(categories, user.id);

    // Act
    const httpResponse = await fetch(
      `${apiUrl}/budgets`,
      { headers: { 'Cookie': `token=${token}`} }
    );
    const s = httpResponse.status;

    const responseBody = await httpResponse.json();

    // Assert
    assert.strictEqual(httpResponse.status, StatusCodes.OK);
    assert.doesNotThrow(() => apiBudgetListBodyScheme.parse(responseBody));
    assert.strictEqual(responseBody.count, budgets.length);
    for (const apiBudget of responseBody.budgets) {
      const refBudget = budgets.find(b => b.id === apiBudget.id);
      assert.notStrictEqual(refBudget, undefined);
      assert.strictEqual(apiBudget.limit, refBudget!.limit);
      assert.strictEqual(apiBudget.userId, refBudget!.userId);
      assert.strictEqual(apiBudget.categoryId, refBudget!.categoryId);
    }
  });
});