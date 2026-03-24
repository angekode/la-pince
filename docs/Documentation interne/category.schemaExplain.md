# category.schema.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier définit les règles de validation pour les catégories via Zod.

---

## 🧩 Schémas

### createCategorySchema
- `name` : string
- min 2 caractères
- max 50 caractères

### updateCategorySchema
- même structure que create
- mais tous les champs sont optionnels (PATCH)

---

## 📝 Notes importantes
- Les contrôleurs utilisent `safeParse()` pour valider les données.
- Les types TypeScript sont générés automatiquement via `z.infer`.
