import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RegisterForm from "./RegisterForm";

// mock API
vi.mock("../../services/auth/auth.service", () => ({
  registerUser: vi.fn(),
}));

import { registerUser } from "../../services/auth/auth.service";

describe("RegisterForm", () => {
  it("affiche le formulaire", () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText("Prénom")).toBeInTheDocument();
    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Mot de passe")).toBeInTheDocument();
  });

  it("affiche une erreur si formulaire vide", async () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    expect(
      await screen.findByText(/Le prénom est obligatoire/i)
    ).toBeInTheDocument();
  });

  it("affiche erreur si email invalide", async () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText("Prénom"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "email-invalide" },
    });

    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "Password123!" },
    });

    fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    expect(
      await screen.findByText(/L'adresse e-mail est invalide/i)
    ).toBeInTheDocument();
  });

  it("appel API si formulaire valide", async () => {
    (registerUser as any).mockResolvedValueOnce({});

    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText("Prénom"), {
      target: { value: "John" },
    });

    fireEvent.change(screen.getByLabelText("Nom"), {
      target: { value: "Doe" },
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@test.com" },
    });

    fireEvent.change(screen.getByLabelText("Mot de passe"), {
      target: { value: "Password123!" },
    });

    fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
      target: { value: "Password123!" },
    });

    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalled();
    });

    expect(
      await screen.findByText(/Compte créé avec succès/i)
    ).toBeInTheDocument();
  });

  it("affiche une erreur si l'API retourne une erreur", async () => {
  (registerUser as any).mockRejectedValueOnce(
    new Error("Email déjà utilisé")
  );

  render(<RegisterForm />);

  fireEvent.change(screen.getByLabelText("Prénom"), {
    target: { value: "John" },
  });

  fireEvent.change(screen.getByLabelText("Nom"), {
    target: { value: "Doe" },
  });

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "john@test.com" },
  });

  fireEvent.change(screen.getByLabelText("Mot de passe"), {
    target: { value: "Password123!" },
  });

  fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
    target: { value: "Password123!" },
  });

  fireEvent.click(screen.getByRole("checkbox"));

  fireEvent.click(screen.getByRole("button", { name: /s'inscrire/i }));

  expect(
    await screen.findByText(/Email déjà utilisé/i)
  ).toBeInTheDocument();
});

it("désactive le bouton pendant la soumission", async () => {
  let resolvePromise: any;

  (registerUser as any).mockImplementation(
    () =>
      new Promise((resolve) => {
        resolvePromise = resolve;
      })
  );

  render(<RegisterForm />);

  fireEvent.change(screen.getByLabelText("Prénom"), {
    target: { value: "John" },
  });

  fireEvent.change(screen.getByLabelText("Nom"), {
    target: { value: "Doe" },
  });

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "john@test.com" },
  });

  fireEvent.change(screen.getByLabelText("Mot de passe"), {
    target: { value: "Password123!" },
  });

  fireEvent.change(screen.getByLabelText("Confirmer le mot de passe"), {
    target: { value: "Password123!" },
  });

  fireEvent.click(screen.getByRole("checkbox"));

  const button = screen.getByRole("button", { name: /s'inscrire/i });

  fireEvent.click(button);

  // bouton disabled pendant loading
  expect(button).toBeDisabled();

  // on résout la promesse
  resolvePromise();

  await waitFor(() => {
    expect(button).not.toBeDisabled();
  });
});

});