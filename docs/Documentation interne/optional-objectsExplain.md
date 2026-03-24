# optional-objects.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier contient une fonction utilitaire permettant de supprimer les champs `undefined` d’un objet.

---

## 🧩 Pourquoi c’est utile ?
Lors d’un `PATCH`, le client peut envoyer seulement certains champs.  
Si on envoie un champ `undefined` à Prisma, il peut écraser la valeur existante.

`stripUndefined()` permet donc de :
- nettoyer les données
- éviter les mises à jour involontaires
- rendre les PATCH plus sûrs

---

## 📝 Notes importantes
- La fonction retourne un objet partiel propre.
- Utilisée dans les services `updateCategory` et `updateTransaction`.
