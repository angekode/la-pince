import { describe, it } from 'node:test';
import assert from 'node:assert';

import { StatusCodes } from 'http-status-codes';
import zod from 'zod';

import { 
  createNewUser, 
  seedCategories, 
  seedBudgets,
  apiUrl
} from '../tools';


const apiBudgetItemScheme = zod.object({
  id: zod.number(),
  limit: zod.number(),
  category: zod.string(),
  userId: zod.number()
});

const apiBudgetListBodyScheme = zod.object({
  count: zod.number(),
  budgets: zod.array(apiBudgetItemScheme)
});

// ---------------------------------------------------------
// TEST : GET /budgets
// Doit renvoyer un status 200 et un object { count, budgets }
// ---------------------------------------------------------

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
    const body = apiBudgetListBodyScheme.parse(responseBody);

    // Assert
    assert.strictEqual(httpResponse.status, StatusCodes.OK);
    assert.strictEqual(body.count, budgets.length);
    for (const apiBudget of body.budgets) {
      const refBudget = budgets.find(b => b.id === apiBudget.id);
      assert.notStrictEqual(refBudget, undefined);
      assert.strictEqual(apiBudget.limit, refBudget!.limit);
      assert.strictEqual(apiBudget.userId, refBudget!.userId);
      assert.strictEqual(apiBudget.category, refBudget!.category); // vérifier le nom
    }
  });
});