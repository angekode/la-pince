import type { PasswordChecks } from "../../types/auth/auth.types";

type PasswordRulesProps = {
  checks: PasswordChecks;
};

export default function PasswordRules({ checks }: PasswordRulesProps) {
  return (
    <ul className="password-rules">
      <li className={checks.minLength ? "valid" : "invalid"}>
        Au moins 12 caractères
      </li>
      <li className={checks.lowercase ? "valid" : "invalid"}>
        Une lettre minuscule
      </li>
      <li className={checks.uppercase ? "valid" : "invalid"}>
        Une lettre majuscule
      </li>
      <li className={checks.number ? "valid" : "invalid"}>
        Un chiffre
      </li>
      <li className={checks.specialChar ? "valid" : "invalid"}>
        Un caractère spécial
      </li>
      <li className={checks.passwordsMatch ? "valid" : "invalid"}>
        Mots de passe identiques
      </li>
    </ul>
  );
}