import { useMemo, useState } from "react";
import crabLogo from "../../assets/crab-svgrepo-com.svg";

import type { RegisterFormData } from "../../types/auth/auth.types";
import { registerUser } from "../../services/auth/auth.service";
import {
  getPasswordChecks,
  isStrongPassword,
  isValidEmail,
} from "../../utils/auth/passwordRules";
import PasswordRules from "./PasswordRules";

type RegisterFormProps = {
  onSuccess?: () => void;
};

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [form, setForm] = useState<RegisterFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptPrivacyPolicy: false,
  });

  // afficher l’erreur
  const [errorMessage, setErrorMessage] = useState("");
  // afficher le succès
  const [successMessage, setSuccessMessage] = useState("");
  // désactiver le bouton pendant l’envoi
  const [isSubmitting, setIsSubmitting] = useState(false);
  // afficher/masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);
  // afficher/masquer la confirmation
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // recalculer les règles du mot de passe seulement quand password ou confirmPassword changent
  const checks = useMemo(
    () => getPasswordChecks(form.password, form.confirmPassword),
    [form.password, form.confirmPassword]
  );

  // on n’écris pas une fonction setFirstName, setLastName, etc.
  // une seule fonction réutilisable pour tous les champs
  function updateField<K extends keyof RegisterFormData>(
    field: K,
    value: RegisterFormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validateForm(): string | null {
    if (!form.firstName.trim()) {
      return "Le prénom est obligatoire.";
    }

    if (!form.lastName.trim()) {
      return "Le nom est obligatoire.";
    }

    if (!form.email.trim()) {
      return "L'adresse e-mail est obligatoire.";
    }

    if (!isValidEmail(form.email.trim())) {
      return "L'adresse e-mail est invalide.";
    }

    if (!isStrongPassword(form.password)) {
      return "Le mot de passe ne respecte pas les règles demandées.";
    }

    if (form.password !== form.confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
    }

    if (!form.acceptPrivacyPolicy) {
      return "Vous devez accepter la Politique de Confidentialité.";
    }

    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // empêcher le rechargement Sinon le navigateur recharge la page.
    event.preventDefault();
    // reset des messages
    setErrorMessage("");
    setSuccessMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      await registerUser({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      setSuccessMessage("Compte créé avec succès. Redirection vers la connexion...");

      setTimeout(() => {
        onSuccess?.();
      }, 1200);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Une erreur est survenue lors de l'inscription.");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit} noValidate>
      <div className="brand-block">
        <div className="brand-logo">
          <img src={crabLogo} alt="La Pince logo" />
        </div>
        <h1 className="register-title">Bienvenue sur La Pince</h1>
        <p className="register-subtitle">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="inline-link">
            Se connecter
          </a>
        </p>
      </div>

      {errorMessage && <div className="alert alert-error">{errorMessage}</div>}
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      <div className="form-group">
        <label htmlFor="firstName">Prénom</label>
        <input
          id="firstName"
          type="text"
          placeholder="John"
          value={form.firstName}
          onChange={(e) => updateField("firstName", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Nom</label>
        <input
          id="lastName"
          type="text"
          placeholder="Doe"
          value={form.lastName}
          onChange={(e) => updateField("lastName", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          placeholder="john.doe@gmail.com"
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Mot de passe</label>
        <div className="password-input-wrapper">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Votre mot de passe"
            value={form.password}
            onChange={(e) => updateField("password", e.target.value)}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? "Masquer" : "Afficher"}
          </button>
        </div>
      </div>

      <div className="rules-wrapper">
        <PasswordRules checks={checks} />
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
        <div className="password-input-wrapper">
          <input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer le mot de passe"
            value={form.confirmPassword}
            onChange={(e) => updateField("confirmPassword", e.target.value)}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
          >
            {showConfirmPassword ? "Masquer" : "Afficher"}
          </button>
        </div>
      </div>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.acceptPrivacyPolicy}
          onChange={(e) =>
            updateField("acceptPrivacyPolicy", e.target.checked)
          }
        />
        <span>
          J'accepte la{" "}
          <a href="/privacy-policy" className="inline-link">
            Politique de Confidentialité
          </a>
        </span>
      </label>

      <button className="primary-button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Inscription..." : "S'inscrire"}
      </button>
    </form>
  );
}