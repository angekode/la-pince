import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import PasswordRules from "./PasswordRules";

describe("PasswordRules", () => {
  const baseChecks = {
    minLength: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialChar: false,
    passwordsMatch: false,
  };

  it("affiche toutes les règles", () => {
    render(<PasswordRules checks={baseChecks} />);

    expect(screen.getByText("Au moins 12 caractères")).toBeInTheDocument();
    expect(screen.getByText("Une lettre minuscule")).toBeInTheDocument();
    expect(screen.getByText("Une lettre majuscule")).toBeInTheDocument();
    expect(screen.getByText("Un chiffre")).toBeInTheDocument();
    expect(screen.getByText("Un caractère spécial")).toBeInTheDocument();
    expect(screen.getByText("Mots de passe identiques")).toBeInTheDocument();
  });

  it("affiche toutes les règles en invalid par défaut", () => {
    render(<PasswordRules checks={baseChecks} />);

    const items = screen.getAllByRole("listitem");

    items.forEach((item) => {
      expect(item).toHaveClass("invalid");
    });
  });

  it("affiche les règles en valid si conditions remplies", () => {
    const validChecks = {
      minLength: true,
      lowercase: true,
      uppercase: true,
      number: true,
      specialChar: true,
      passwordsMatch: true,
    };

    render(<PasswordRules checks={validChecks} />);

    const items = screen.getAllByRole("listitem");

    items.forEach((item) => {
      expect(item).toHaveClass("valid");
    });
  });

  it("affiche un mélange valid / invalid", () => {
    const mixedChecks = {
      minLength: true,
      lowercase: false,
      uppercase: true,
      number: false,
      specialChar: true,
      passwordsMatch: false,
    };

    render(<PasswordRules checks={mixedChecks} />);

    expect(screen.getByText("Au moins 12 caractères")).toHaveClass("valid");
    expect(screen.getByText("Une lettre minuscule")).toHaveClass("invalid");
    expect(screen.getByText("Une lettre majuscule")).toHaveClass("valid");
    expect(screen.getByText("Un chiffre")).toHaveClass("invalid");
    expect(screen.getByText("Un caractère spécial")).toHaveClass("valid");
    expect(screen.getByText("Mots de passe identiques")).toHaveClass("invalid");
  });
});