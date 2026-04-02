import { Home } from 'lucide-react'
import { useNavigate } from "react-router-dom";

import LoginForm from '../../components/auth/LoginForm';



function LoginPage() {

    const navigate = useNavigate();

    function handleLoginSuccess() {
    navigate("/")
    }

    

  return (
    

      <main className="page-container">
        <section className="auth-card">
          <LoginForm onSuccess={handleLoginSuccess} />
        </section>

        
        <div className="home-button-wrapper">
            <button className="acceuil-button" onClick={() => navigate("/home")}><Home size={18}></Home>
            Acceuil
            </button>
        </div>
      </main>
  )
}

export default LoginPage