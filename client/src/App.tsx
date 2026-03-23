import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ThemeToggle from "./components/ThemeToggle";
import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/auth/DashboardPage";
import Register from "./pages/auth/Register";
import "./styles/theme.css";

export default function App() {

  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </>
  );
}
