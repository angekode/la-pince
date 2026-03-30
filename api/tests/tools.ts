import { prisma } from '../src/db/prisma-client';
import { StatusCodes } from 'http-status-codes';
import assert from 'node:assert';


export const apiUrl = `http://localhost:${process.env.PORT}`;

/**
 * Envoie une requête POST avec un body JSON.
 * Utilisé dans la majorité des tests pour appeler les routes de l’API.
 * 
 * Le header "Connection: close" force l’ouverture d’une nouvelle connexion
 * pour chaque requête afin d’éviter l’erreur ECONNRESET dans Node Test Runner.
 */

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

/**
 * Extrait le token JWT stocké dans les cookies de la réponse HTTP.
 * 
 * Utilisé après un login pour récupérer le token d’authentification.
 * Retourne null si aucun cookie "token=" n’est trouvé.
 */

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
 * Crée un utilisateur aléatoire + récupère un token JWT.
 * 
 * Utile pour les tests nécessitant un utilisateur authentifié.
 * Retourne :
 *  - l’utilisateur créé (id, firstName, lastName, email)
 *  - le token JWT associé
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

    // Enregistrement de l'utilisateur pour récupérer son id et éviter les problèmes d'unicité sur l'email
    const registerResponse = await postObject(`${apiUrl}/auth/register`, userToLog); // on enregistre l'utilisateur
    assert.strictEqual(registerResponse.status, StatusCodes.CREATED);
    const registerBody = await registerResponse.json();


    // Connexion pour récupérer le token d'authentification
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
 * Génère un utilisateur aléatoire (un object User avec des noms aléatoires) pour éviter les collisions email ()
 * (contrainte d’unicité dans la base, dans les tests).
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

/**
 * Catégories utilisées pour les tests.
 * Elles sont clonées pour chaque utilisateur via seedCategories().
 */
const categoriesToCreate = [
    { name: 'nourriture', colorCode: '#ff00ff' },
    { name: 'impots', colorCode: '#ff00ff' },
    { name: 'loisirs', colorCode: '#ff00ff' }
];

/**
 * Insère plusieurs catégories pour un utilisateur donné.
 * Utilisé dans les tests des routes /categories.
 */
export async function seedCategories(): Promise<{ id: number, name: string, colorCode: string }[]> {
   return await prisma.category.createManyAndReturn(
    { 
      data: categoriesToCreate 
    });
}

/**
 * Transactions de test utilisées pour les routes /transactions.
 * 
 * Elles servent de base pour générer rapidement plusieurs dépenses
 * associées à un utilisateur et une catégorie.
 * 
 * Les dates sont fixées volontairement pour garantir la stabilité des tests
 * (évite les variations liées au fuseau horaire ou à la date du jour).
 */
export const transactionsToCreate = [
  { label: 'Courses', amount: 53.55, date: new Date(Date.UTC(2026,5,10)), description: 'Auchan' },
  { label: 'Essence', amount: 18.20, date: new Date(Date.UTC(2026,5,10)), description: 'SNCF' },
  { label: 'Restaurant', amount: 27.90, date: new Date(Date.UTC(2026,5,10)), description: 'McDonald\'s' },
  { label: 'CGR', amount: 12.50, date: new Date(Date.UTC(2026,5,10)), description: 'Cinéma CGR' }
];

/**
 * Insère plusieurs transactions pour un utilisateur et une catégorie donnée.
 * 
 * Utilisé dans les tests d’intégration des routes /transactions :
 *  - permet de tester le listing
 *  - permet de tester les filtres
 *  - permet de tester les totaux
 * 
 * Retourne la liste complète des transactions créées, avec leurs IDs.
 */
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


/**
 * Insère plusieurs budget pour toutes les catégories données (elles même générées par seedCategories)
 */
export async function seedBudgets(categoryEntries: { id: number, name: string }[], userId: number):
Promise<{ id: number, limit: number, categoryId: number, userId: number, category: string, alertEnabled: boolean }[]>
{
  // On récupère les données crées dans la table 
  const rawDbEntries = await prisma.budget.createManyAndReturn({
    data: categoryEntries.map(category => ({ limit: 100, categoryId: category.id, userId, alertEnabled: true }))
  });

  // On ajoute un élément category: string qui contient le nom literal au lieu de l'id seul
  return rawDbEntries.map(budgetEntry => ({
    ...budgetEntry, 
    category: categoryEntries.find(c => c.id === budgetEntry.categoryId)?.name ?? ''
  }))
}