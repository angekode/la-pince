import RegisterForm from "../../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";
import { Home } from 'lucide-react'

export default function Register() {
  const navigate = useNavigate();
  function handleRegisterSuccess() {
    navigate("/login");
  }

  return (
    <main className="page-container">
      <section className="auth-card">
        <RegisterForm onSuccess={handleRegisterSuccess} />
      </section>

      <div className="home-button-wrapper">
            <button className="acceuil-button" onClick={() => navigate("/")}><Home size={18}></Home>
            Acceuil
            </button>
      </div>
    </main>
  );
}