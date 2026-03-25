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


// ---------------------------------------------------------
// TEST : GET /budgets/:id
// Doit renvoyer un status 200 et un object contenant les infos d'un seul budget
// ---------------------------------------------------------

describe('GET /budgets/:id', () => {
  it('should return on budget from user', async () => {
    // Arrange 
    const { user, token } = await createNewUser();
    const categories = await seedCategories();
    const budgets = await seedBudgets(categories, user.id);
    const refBudget = budgets[0];

    // Act
    const httpResponse = await fetch(
      `${apiUrl}/budgets/${refBudget.id}`,
      { headers: { 'Cookie': `token=${token}`} }
    );
    const responseBody = await httpResponse.json();
    const body = apiBudgetItemScheme.parse(responseBody);

    // Assert
    assert.strictEqual(httpResponse.status, StatusCodes.OK);
    assert.notStrictEqual(refBudget, undefined);
    assert.strictEqual(body.limit, refBudget!.limit);
    assert.strictEqual(body.userId, refBudget!.userId);
    assert.strictEqual(body.category, refBudget!.category);
  });
});


const postBudgetBodyResponse = zod.object({
  id: zod.number(),
  limit: zod.number(),
  categoryId: zod.number(),
  userId: zod.number()
});

// ---------------------------------------------------------
// TEST : POST /budgets
// Doit renvoyer un status 200 et un object contenant les infos d'un seul budget
// ---------------------------------------------------------

describe('POST /budgets', () => {
  it('should create one budget', async () => {
    // Arrange 
    const { user, token } = await createNewUser();
    const categories = await seedCategories();
    const budgetToCreate = {
      categoryId: categories[0].id,
      limit: 100
    };

    // Act
    const httpResponse = await fetch(
      `${apiUrl}/budgets`,
      {
        method: 'POST',
        headers: { 'Cookie': `token=${token}`, 'Content-Type': 'application/json'},
        body: JSON.stringify(budgetToCreate)
      }
    );
    const responseBody = await httpResponse.json();
    
    // Assert
    assert.strictEqual(httpResponse.status, StatusCodes.CREATED);
    const body = postBudgetBodyResponse.parse(responseBody);
    assert.strictEqual(body.limit, budgetToCreate!.limit);
    assert.strictEqual(body.userId, user.id);
    assert.strictEqual(body.categoryId, budgetToCreate!.categoryId);
  });
});