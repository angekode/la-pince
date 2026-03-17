import { useState } from 'react';
import { Home } from 'lucide-react'

function LoginPage() {

    const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errorPseudo, setErrorPseudo] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(pseudo, email, password);

        setErrorPseudo('')
        setErrorEmail('')
        setErrorPassword('')

        if (!pseudo) {
            setErrorPseudo('Pseudo obligatoire')
        }

        if (!email) {
            setErrorEmail('Email obligatoire')
        }

        if (!password) {
            setErrorPassword('Mot de passe obligatoire')
        }

        
    }

  return (
    <div className="auth-page">
      <header className="auth-header">
        <div className="auth-logo">LOGO</div>
      </header>

      <main className="auth-main">
        <section className="auth-card">
          <div className="auth-tabs">
            <button className="auth-tab active" type="button">
              Connexion
            </button>
            <button className="auth-tab" type="button">
              Inscription
            </button>
          </div>


          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="pseudo">Pseudonyme</label>
                <input 
                    id="pseudo"
                    type="text"
                    placeholder="Oclock2026"
                    value={pseudo}
                    onChange={(event) => setPseudo(event.target.value) } 
                />
                {errorPseudo && <p className="error-message">{errorPseudo}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Adresse mail</label>
              <input 
                id="email"
                type="email" 
                placeholder="oclock@mail.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                 />
                 {errorEmail && <p className="error-message">{errorEmail}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password" 
                type="password" 
                placeholder="**********"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                 />
                 {errorPassword && <p className="error-message">{errorPassword}</p>}
            </div>

            <button className="primary-button" type="submit">
              Valider
            </button>

            
          </form>

        </section>

        <section>
            
            <button className="acceuil-button" onClick="window.location.href='https://example.com';"><Home size={18}></Home>Acceuil</button>
        
        </section>
        

      </main>

      <footer className="auth-footer">
        <a href="/">RGPD</a>
        <a href="/">CGU</a>
        <a href="/">Mentions légales</a>
      </footer>
    </div>
  )
}

export default LoginPage