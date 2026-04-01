import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import DashboardPage from "./pages/DashboardPage";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LoginPage from "./pages/auth/LoginPage";
import ThemeToggle from "./components/ThemeToggle";
import Register from "./pages/auth/Register";
import ExpensePage from "./pages/ExpensePage";
import Logout from "./pages/Logout";

import "./styles/index.css";
import "./services/graphs/graphs-data.service"

export default function App() {



  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<ExpensePage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      <Footer/>
    </>
  );
}