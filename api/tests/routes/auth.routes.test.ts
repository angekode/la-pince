import { describe, it } from 'node:test';
import assert from 'node:assert';
import { StatusCodes } from 'http-status-codes';


/**
 * Il faut que la base de données soit vierge pour réaliser ces tests (à faire dans le setup.js).
 */

const skip = true; // tant que les routes ne sont pas implémentés


const apiUrl = `http://localhost:${process.env.PORT}`;


/**
 * Teste uniquement si le server test répond
 */
describe('server connexion', () => {
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
describe('POST /auth/register', () => {

  it('valid data should return status created 201', async () => {
    // Arrange
    const newUser = {
      firstname: 'Bob',
      lastname: 'Dupond',
      email: 'bob@mail.com',
      password: 'password'
    };

    // Act
    const response = await postObject(`${apiUrl}/auth/register`, newUser);
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.CREATED);
    assert.strictEqual(responseBody.firstname, newUser.firstname);
    assert.strictEqual(responseBody.lastname, newUser.lastname);
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
describe('POST /auth/login', () => {
  it('registered user should get a token', async () => {
    // Arrange
    const userToLog = {
      firstname: 'Coralie',
      lastname: 'Dupond',
      email: 'coralie@mail.com',
      password: 'password'
    };
    const registerResponse = await postObject(`${apiUrl}/auth/register`, userToLog); // on enregistre l'utilisateur
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);

    // Act
    const response = await postObject(`${apiUrl}/auth/login`, userToLog); // login de l'utilisateur
    const responseBody = await response.json();

    // Check
    assert.strictEqual(response.status, StatusCodes.OK);
    assert.strictEqual(typeof responseBody.token, 'string'); // token bien généré
    assert.strictEqual(responseBody.user.email, userToLog.email); // infos utilisateur 
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
      firstname: 'John',
      lastname: 'Smith',
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
describe('POST /auth/logout', () => {
  it('should return status code 200 OK', async () => {
    // Arrange
    const userToLogout = {
      email: 'bob@mail.com',
      password: 'password'
    };

    // Act
    const response = await postObject(`${apiUrl}/auth/logout`, userToLogout);

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
      firstname: 'Patrick',
      lastname: 'Perez',
      email: 'patrick@mail.com',
      password: 'password'
    };
    const registerResponse = await postObject(`${apiUrl}/auth/register`, user); // on enregistre l'utilisateur
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);
    const loginResponse = await postObject(`${apiUrl}/auth/login`, user); // on récupère le token
    const loginBody = await loginResponse.json();
    assert.strictEqual(typeof loginBody.token, 'string');

    // Act
    const response = await fetch(
      `${apiUrl}/auth/me`,
      {
        method: 'GET',
        headers: { 'Cookie' : `token=${loginBody.token}`}
      }
    );
    const responseBody = await response.json();

    // Check 
    assert.strictEqual(responseBody.status, StatusCodes.OK);
    assert.strictEqual(responseBody.firstname, user.firstname);
    assert.strictEqual(responseBody.lastname, user.lastname);
    assert.strictEqual(responseBody.email, user.email);
  });
});



async function postObject(route: string, body: object): Promise<Response> {
  return await fetch(
    route,
    {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify(body)
    }
  );
}