# transaction.schema.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier définit les règles de validation pour les transactions via Zod.

---

## 🧩 Schémas

### createTransactionSchema
- `amount` : nombre positif
- `label` : string non vide
- `date` : ISO datetime
- `categoryId` : entier positif

### updateTransactionSchema
- même structure que create
- mais tous les champs deviennent optionnels

---

## 📝 Notes importantes
- Utilisé dans les contrôleurs pour valider les données avant d’appeler les services.
- Garantit que seules des données valides atteignent Prisma.
