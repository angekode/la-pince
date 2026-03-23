import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';

import { 
  postObject,
  createNewUser, 
  generateRandomUserInfo, 
  seedCategories,
  extractTokenFromCookie
} from '../tools';

/**
 * Il faut que la base de données soit vierge pour réaliser ces tests (à faire dans le setup.js).
 * NOTE : La base doit être vide avant les tests, mais les tests ne font pas de nettoyage après eux.
 * → Si on veut faire des tests plus poussés (ex: vérifier que les données sont bien enregistrées),
 *  il faudra faire du setup/teardown dans chaque test pour créer et supprimer les données de test.
 */

const skip = false; // tant que les routes ne sont pas implémentés


const apiUrl = `http://localhost:${process.env.PORT}`;


// ---------------------------------------------------------
// TEST : Le serveur répond
// ---------------------------------------------------------

describe('server connexion', { skip }, () => {
  it('/ should respond', async () => {
    // Act
    const response = await fetch(apiUrl);
    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
  });
});

// ---------------------------------------------------------
// TEST : POST /auth/register
// doit renvoyer le status 201 et un objet { username, email }
// ---------------------------------------------------------

describe('POST /auth/register', { skip }, () => {

  it('valid data should return status created 201', async () => {
    // Arrange
    const newUser = {
      firstName: 'Bob',
      lastName: 'Dupond',
      email: 'bob@mail.com',
      password: 'password'
    };

    // Act
    const response = await postObject(`${apiUrl}/auth/register`, newUser);
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.CREATED);
    assert.strictEqual(responseBody.firstName, newUser.firstName);
    assert.strictEqual(responseBody.lastName, newUser.lastName);
    assert.strictEqual(responseBody.email, newUser.email);
  });


  
  // Le middleware doit vérifier que tous les champs sont bien présents
  it('invalid data should return status 400 BAD_REQUEST', async () => {
    // Arrange
    const invalidUser = {
      username: 'Bob',
      email: 'bob@mail.com'
    };

    // Act
    const response = await postObject(`${apiUrl}/auth/register`, invalidUser);

    // Check
    assert.strictEqual(response.status, StatusCodes.BAD_REQUEST);
  });
});

// ---------------------------------------------------------
// TEST : POST /auth/login
// doit renvoyer un token dans les cookies et les infos de l'utilisateur
// ---------------------------------------------------------

describe('POST /auth/login', { skip }, () => {
  it('registered user should get a token', async () => {
    // Arrange
    const userToLog = {
      firstName: 'Coralie',
      lastName: 'Dupond',
      email: 'coralie@mail.com',
      password: 'password'
    };
    const registerResponse = await postObject(`${apiUrl}/auth/register`, userToLog); // on enregistre l'utilisateur
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);

    // Act
    const response = await postObject(`${apiUrl}/auth/login`, userToLog);            // login de l'utilisateur
    const responseBody = await response.json();
    const token = extractTokenFromCookie(response);
    assert.notStrictEqual(token, null);

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.strictEqual(typeof token, 'string');                                     // token bien généré
    assert.strictEqual(responseBody.email, userToLog.email);                        // infos utilisateur 
  });


  it('unknown user should return 404 NOT_FOUND', async () => {
    // Arrange
    const unknownUser = {
      email: 'pape@mail.com',
      password: 'password'
    };

    // Act
    const response = await postObject(`${apiUrl}/auth/login`, unknownUser);

    // Check
    assert.strictEqual(response.status, StatusCodes.NOT_FOUND);
  });


  it('wrong password should return 401 Unauthorized', async () => {
    // Arrange
    const newUser = {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@mail.com',
      password: 'password'
    }
    const registerResponse = await postObject(`${apiUrl}/auth/register`, newUser); // on l'enregistre
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);
    const userToLogWrongPassword = {
      email: 'john@mail.com',
      password: 'wrong_password'
    };

    // Act
    const response = await postObject(`${apiUrl}/auth/login`, userToLogWrongPassword); // bon user, mauvais password

    // Check
    assert.strictEqual(response.status, StatusCodes.UNAUTHORIZED);
  });
});

// ---------------------------------------------------------
// TEST : POST /auth/logout
// doit renvoyer le status 200 et supprimer le token côté client
// ---------------------------------------------------------

describe('POST /auth/logout', { skip }, () => {
  it('should return status code 200 OK', async () => {
    // Arrange
    const userToLogout = {
      firstName: 'Joseph',
      lastName: 'Baron',
      email: 'joseph@mail.com',
      password: 'password'
    };
    const registerResponse = await postObject(`${apiUrl}/auth/register`, userToLogout); // on enregistre l'utilisateur
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);

    const loginResponse = await postObject(`${apiUrl}/auth/login`, userToLogout);        // on récupère le token
    const token = extractTokenFromCookie(loginResponse);
    assert.notStrictEqual(token, null);

    // Act
    const response = await fetch(`${apiUrl}/auth/logout`, {
        method: 'POST',
        headers: { 
          'Cookie' : `token=${token}`,
          'Connection' : 'close' // pour que chaque requete parte sur une nouvelle connexion et éviter ECONNRESET
        }
      }
    );

   
    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
  });
});

// ---------------------------------------------------------
// TEST : GET /auth/me
// doit renvoyer les infos de l'utilisateur connecté
// ---------------------------------------------------------

describe('POST /auth/me', { skip }, () => {
  it('should return status code 200 OK', async () => {
    // Arrange
    const user = {
      firstName: 'Patrick',
      lastName: 'Perez',
      email: 'patrick@mail.com',
      password: 'password'
    };
    const registerResponse = await postObject(`${apiUrl}/auth/register`, user); // on enregistre l'utilisateur
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);

    const loginResponse = await postObject(`${apiUrl}/auth/login`, user);       // on récupère le token
    const token = extractTokenFromCookie(loginResponse);
    assert.notStrictEqual(token, null);

    // Act
    const response = await fetch(
      `${apiUrl}/auth/me`,
      {
        method: 'GET',
        headers: { 
          'Cookie' : `token=${token}`,
          'Connection' : 'close'        // pour que chaque requete parte sur une nouvelle connexion et éviter ECONNRESET
        }
      }
    );
    const responseBody = await response.json();

    // Check 
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.strictEqual(responseBody.firstName, user.firstName);
    assert.strictEqual(responseBody.lastName, user.lastName);
    assert.strictEqual(responseBody.email, user.email);
  });
});

// ---------------------------------------------------------
// Fonctions utilitaires pour les tests
// ---------------------------------------------------------
// Les fonctions postObject et extractTokenFromCookie sont désormais importées depuis ../tools.
// Les définitions locales ont été supprimées pour éviter les conflits de nom et centraliser les utilitaires.