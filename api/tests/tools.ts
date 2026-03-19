import { prisma } from '../src/db/prisma-client';
import { StatusCodes } from 'http-status-codes';
import assert from 'node:assert';


export const apiUrl = `http://localhost:${process.env.PORT}`;

export async function postObject(route: string, body: object): Promise<Response> {
  return await fetch(
    route,
    {
      method: 'POST',
      headers: { 
        'Content-Type' : 'application/json',
        'Connection' : 'close' // pour que chaque requete parte sur une nouvelle connexion et éviter ECONNRESET
      },
      body: JSON.stringify(body)      
    }
  );
}

export function extractTokenFromCookie(httpResponse: Response): string | null {
  const cookieArray = httpResponse.headers.getSetCookie();
  if (cookieArray.length === 0) {
    return null;
  }
  const tokenCookie = cookieArray.find(cookie => cookie.startsWith('token='));
  if (!tokenCookie) {
    return null;
  }
  const matches = tokenCookie.match(/token=([^;]+)/);
  if (!matches || matches.length !== 2) {
    return null;
  }
  return matches[1];
}



/**
 * Pour créer un nouvelle utilisateur authentifié avec un token
 */
export async function createNewUser(): 
Promise<{ 
  user: { 
    id: number,
    firstName: string, 
    lastName: string,
    email: string
  }, 
  token: string
}> {

      // Arrange
    const userToLog =  generateRandomUserInfo();

    const registerResponse = await postObject(`${apiUrl}/auth/register`, userToLog); // on enregistre l'utilisateur
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);
    const registerBody = await registerResponse.json();


    // Act
    const response = await postObject(`${apiUrl}/auth/login`, userToLog); // login de l'utilisateur
    const responseBody = await response.json();
    const token = extractTokenFromCookie(response);
    if (!token) {
      throw new Error('Token non valide');
    }

    return {
      user: { id: registerBody.id, ...userToLog },
      token
    }
}


/**
 * Génère un object User avec des noms aléatoires pour éviter les contraintes d'unicité dans les tests
 */
export function generateRandomUserInfo(): { 
    firstName: string, 
    lastName: string,
    email: string,
    password: string
  } {
    const randomNumber = Math.floor(Math.random()*10000);
    return {
      firstName: `Bob${randomNumber}`,
      lastName: `Smith${randomNumber}`,
      email: `bob.smith${randomNumber}@mail.com`,
      password: randomNumber.toString()
    }
  }


const categoriesToCreate = [
    { name: 'nourriture', userId: 1 },
    { name: 'impots', userId: 1 },
    { name: 'loisirs', userId: 1 }
];

export async function seedCategories(userId: number): Promise<{ id: number, name: string, userId: number }[]> {
   return await prisma.category.createManyAndReturn(
    { 
      data: categoriesToCreate.map(c => ({ name: c.name, userId })) 
    });
}


export const transactionsToCreate = [
  { label: 'Courses', amount: 53.55, date: new Date(Date.UTC(2026,5,10)), description: 'Auchan' },
  { label: 'Essence', amount: 18.20, date: new Date(Date.UTC(2026,5,10)), description: 'SNCF' },
  { label: 'Restaurant', amount: 27.90, date: new Date(Date.UTC(2026,5,10)), description: 'McDonald\'s' },
  { label: 'CGR', amount: 12.50, date: new Date(Date.UTC(2026,5,10)), description: 'Cinéma CGR' }
];

export async function seedTransactions(userId: number, categoryId: number): 
Promise<{ 
  id: number,
  label: string,
  amount: number,
  date: Date,
  userId: number,
  categoryId: number,
  description: string | null
  createdAt: Date,
  updatedAt: Date
}[]> {

   return await prisma.expense.createManyAndReturn(
    { 
      data: transactionsToCreate.map(c => ({...c, userId, categoryId })) 
    });
}