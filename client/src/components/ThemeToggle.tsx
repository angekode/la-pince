type ThemeToggleProps = {
  theme: "dark" | "light";
  onToggle: () => void;
};

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px"
      }}
    >
      <button onClick={onToggle}>
        {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
      </button>
    </div>
  );
}