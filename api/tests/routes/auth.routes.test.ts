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
 */

const skip = false; // tant que les routes ne sont pas implémentés


const apiUrl = `http://localhost:${process.env.PORT}`;


/**
 * Teste uniquement si le server test répond
 */
describe('server connexion', { skip }, () => {
  it('/ should respond', async () => {
    // Act
    const response = await fetch(apiUrl);
    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
  });
});


/**
 * POST /auth/register doit renvoyer le status 201 et un objet { username, email }
 */
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




/**
 * POST /auth/login doit renvoyer un token
 */
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
    const response = await postObject(`${apiUrl}/auth/login`, userToLog); // login de l'utilisateur
    const responseBody = await response.json();
    const token = extractTokenFromCookie(response);
    assert.notStrictEqual(token, null);

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.strictEqual(typeof token, 'string'); // token bien généré
    assert.strictEqual(responseBody.email, userToLog.email); // infos utilisateur 
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


/**
 * POST /auth/logout renvoie uniquement 200 pour l'instant
 */
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
    const loginResponse = await postObject(`${apiUrl}/auth/login`, userToLogout); // on récupère le token
    const token = extractTokenFromCookie(loginResponse);
    assert.notStrictEqual(token, null);

    // Act
    const response = await fetch(
      `${apiUrl}/auth/logout`,
      {
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


/**
 * POST /auth/me renvoie les infos d'un utilisateur inscrit et connecté
 */
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
    const loginResponse = await postObject(`${apiUrl}/auth/login`, user); // on récupère le token
    const token = extractTokenFromCookie(loginResponse);
    assert.notStrictEqual(token, null);

    // Act
    const response = await fetch(
      `${apiUrl}/auth/me`,
      {
        method: 'GET',
        headers: { 
          'Cookie' : `token=${token}`,
          'Connection' : 'close' // pour que chaque requete parte sur une nouvelle connexion et éviter ECONNRESET
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
