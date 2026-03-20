# generate-api-doc.ts — Documentation interne

## 🎯 Rôle du fichier
Ce fichier génère automatiquement un fichier `api-doc.json` contenant la documentation OpenAPI de l’API.

Il utilise :
- `swagger-jsdoc` pour analyser les commentaires JSDoc dans les routes
- `fs` et `path` pour écrire le fichier généré dans `/doc`

---

## 🧩 Fonctionnement

1. Définition des options OpenAPI (version, titre, etc.)
2. Analyse des fichiers `src/routes/**/*.ts`
3. Génération de la spécification OpenAPI
4. Création du dossier `/doc` si nécessaire
5. Écriture du fichier `api-doc.json`

---

## 📝 Notes importantes
- Ce fichier **ne sert pas à afficher Swagger UI**.
- Il génère uniquement un fichier JSON.
- Swagger UI utilise `openapiSpec` dans `app.ts`.
