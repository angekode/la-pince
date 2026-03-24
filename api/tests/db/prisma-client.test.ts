import { describe, it } from 'node:test';
import assert from 'node:assert';
import { prisma } from '../../src/db/prisma-client';

// Variable permettant de désactiver les tests (utile tant que la DB n'est pas prête)
const skip = true;

// ---------------------------------------------------------
// TEST : Connexion à la base de données
// ---------------------------------------------------------

describe('db connection', { skip }, () => {
  it('should connect', async () => {
    // Test simple : si prisma.$connect() ne throw pas → OK
    await prisma.$connect();
  });
});

// ---------------------------------------------------------
// TEST : Table user
// ---------------------------------------------------------

describe('user table', { skip }, () => {
  it('should create user', async () => {
    // Arrange : données d'un utilisateur fictif
    const newUser = { 
      firstname: 'Alice', 
      lastname: 'Dupond', 
      email: 'alice@example.com', 
      password: 'password' 
    };
    
    // Act : création + récupération de l'utilisateur
    const userCreated = await prisma.user.create({ data: newUser });
    const findResult = await prisma.user.findUnique({ where : { id: userCreated.id } });

    // Assert : vérification des champs
    assert.notStrictEqual(findResult, null);
    assert.strictEqual(findResult!.id, userCreated.id);
    assert.strictEqual(findResult!.firstname, newUser.firstname);
    assert.strictEqual(findResult!.lastname, newUser.lastname);
    assert.strictEqual(findResult!.email, userCreated.email);
    assert.strictEqual(findResult!.password, userCreated.password);
  });
});