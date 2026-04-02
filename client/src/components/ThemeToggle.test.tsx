import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("affiche 'Light mode' si le thème est dark", () => {
    render(<ThemeToggle />);

    expect(screen.getByText("Light mode")).toBeInTheDocument();
    expect(screen.getByText("☀️")).toBeInTheDocument();
  });

  it("affiche 'Dark mode' si le thème est light", () => {
    render(<ThemeToggle />);

    expect(screen.getByText("Dark mode")).toBeInTheDocument();
    expect(screen.getByText("🌙")).toBeInTheDocument();
  });

  it("appelle onToggle lors du clic", () => {
    const onToggleMock = vi.fn();

    render(<ThemeToggle />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(onToggleMock).toHaveBeenCalled();
  });
});
