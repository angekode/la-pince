import RegisterForm from "../../components/auth/RegisterForm";

export default function Register() {
  function handleRegisterSuccess() {
    window.location.href = "/login";
  }

  return (
    <main className="page-container">
      <section className="auth-card">
        <RegisterForm onSuccess={handleRegisterSuccess} />
      </section>
    </main>
  );
}