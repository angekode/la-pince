/**
 * Sert à supprimer les champ undefined d'un objet. Utile pour les fonctions prisma.update() 
 * QUand on reçoit un objet json du client pour mettre à jour des champs, certains peuvent être 
 * non definis.
 */
export function stripUndefined<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<{ [K in keyof T]: Exclude<T[K], undefined> }>;
}