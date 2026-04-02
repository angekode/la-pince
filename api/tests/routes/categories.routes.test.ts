import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../src/db/prisma-client';

import { 
  postObject,
  extractTokenFromCookie,
  createNewUser, 
  generateRandomUserInfo, 
  seedCategories 
} from '../tools';


/**
 * Il faut que la base de données soit vierge (vide) pour réaliser ces tests (à faire dans le setup.js).
 * Ces tests sont des tests d'intégration : ils appellent la vraie API.
 */

const skip = false; // tant que les routes ne sont pas implémentés - Les tests sont activés

const apiUrl = `http://localhost:${process.env.PORT}`;

/**
 * ---------------------------------------------------------
 * TEST : GET /categories
 * ---------------------------------------------------------
 */

describe('GET /categories', { skip }, () => {

  it('should return catagories list', async () => {
    // Arrange: création d’un utilisateur + token + quelques catégories pour cet utilisateur
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);

    // Act : appel de l’API (la route) pour récupérer les catégories
    const response = await fetch(`${apiUrl}/categories`, {
      headers: { 'Cookie' : `token=${token}`}
    });
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.strictEqual(responseBody.count, categories.length);
    assert.strictEqual(responseBody.categories.length, responseBody.count);

    // Vérification que chaque catégorie renvoyée existe bien et appartient à l'utilisateur
    for (const category of responseBody.categories) {
      // le nom correspond à une catégorie existante ?
      assert.ok(categories.some(c => c.name === category.name));
      assert.strictEqual(typeof category.id, 'number');
    }
  });

  it('should return 401 UNAUTHORIZED for non connected users', async () => {
    // Arrange
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);

    // Act
    const response = await fetch(`${apiUrl}/categories`); // pas de token

    // Check
    assert.strictEqual(response.status, StatusCodes.UNAUTHORIZED);
  });
});

/**
 * ---------------------------------------------------------
 * GET /categories/:id
 * ---------------------------------------------------------
 */
describe('GET /categories/:id', { skip }, () => {

  it('should return one category', async () => {
    // Arrange
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);

    // Act
    const response = await fetch(`${apiUrl}/categories/${categories[0].id}`, {
      headers: { 'Cookie' : `token=${token}`}
    });
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.strictEqual(responseBody.id, categories[0].id);
    assert.strictEqual(responseBody.name, categories[0].name);
    assert.strictEqual(responseBody.userId, categories[0].userId);
  });

  it('should return 404 NOT FOUND for unknown category', async () => {
    // Arrange
    const { user, token } = await createNewUser();
    const categories = await seedCategories(user.id);

    // Act
    const response = await fetch(`${apiUrl}/categories/45686`, {
      headers: { 'Cookie' : `token=${token}`}
    });
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.NOT_FOUND);
  });
});



// Les fonctions utilitaires (postObject, createNewUser, generateRandomUserInfo, seedCategories)
// sont désormais centralisées dans ../tools. Les définitions locales ont été supprimées
// pour éviter les conflits de nom et garantir une seule source de vérité.
