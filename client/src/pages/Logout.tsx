/**
 * ---------------------------------------------------------------------------
 * Logout.tsx
 * ---------------------------------------------------------------------------
 * Page technique permettant de gérer la déconnexion.
 *
 * Fonctionnement :
 *  - Appelle l'API /auth/logout pour supprimer le cookie HTTPOnly.
 *  - Réinitialise l'état utilisateur côté front.
 *  - Redirige automatiquement vers la page d'accueil.
 *
 * Cette page n'affiche rien : elle agit immédiatement au chargement.
 * ---------------------------------------------------------------------------
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/auth/auth.service";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser()
      .catch(() => {
        // même en cas d'erreur, on renvoie vers home
      })
      .finally(() => {
        navigate("/");
      });
  }, []);

  return null;
}
