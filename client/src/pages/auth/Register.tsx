import RegisterForm from "../../components/auth/RegisterForm";
import { useNavigate } from "react-router-dom";

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
    </main>
  );
}