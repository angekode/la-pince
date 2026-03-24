import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import ThemeToggle from "./components/ThemeToggle";
import Register from "./pages/auth/Register";

import "./styles/index.css";
import "./services/graphs/graphs-data.service"

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
      
      <button onClick={test}>Test</button>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
      <Footer/>
    </>
  );
}