import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  it("affiche 'Light mode' si theme dark", () => {
    render(<ThemeToggle theme="dark" onToggle={() => {}} />);

    expect(screen.getByText("☀️ Light mode")).toBeInTheDocument();
  });

  it("affiche 'Dark mode' si theme light", () => {
    render(<ThemeToggle theme="light" onToggle={() => {}} />);

    expect(screen.getByText("🌙 Dark mode")).toBeInTheDocument();
  });

  it("appelle onToggle quand on clique", () => {
    const onToggleMock = vi.fn();

    render(<ThemeToggle theme="dark" onToggle={onToggleMock} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(onToggleMock).toHaveBeenCalled();
  });
});