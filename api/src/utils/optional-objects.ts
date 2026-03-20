/**
 * Supprime les champ undefined d'un objet.
 * Utile pour les opérations PATCH :
 * - éviter d'écraser des valeurs existantes
 * - ne mettre à jour que les champs fournis par le client 
 * Utile pour les fonctions prisma.update() 
 * Quand on reçoit un objet json du client pour mettre à jour des champs, 
 * certains peuvent être non definis.
  * Si on passe directement cet objet à prisma.update(),
  * prisma va interpréter les champs undefined comme une volonté de les mettre à null en base de données, ce qui n'est pas le but.
 * En filtrant les champs undefined, on ne met à jour que les champs réellement fournis par le client, et on laisse les autres inchangés.
 */
export function stripUndefined<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<{ [K in keyof T]: Exclude<T[K], undefined> }>;
}