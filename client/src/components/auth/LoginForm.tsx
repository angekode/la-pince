import { useState } from 'react';
//import { useNavigate } from "react-router-dom";
import { loginUser , getMe} from "../../services/auth/auth.service";
import crabLogo from "../../assets/crab-svgrepo-com.svg";


type LoginFormProps = {
  onSuccess: () => void;
};

function LoginForm({ onSuccess }: LoginFormProps) {

   // const [pseudo, setPseudo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

   // const [errorPseudo, setErrorPseudo] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false);

    //const navigate = useNavigate();


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(/*pseudo,*/ email, password);

        //setErrorPseudo('')
        setErrorEmail('')
        setErrorPassword('')

        /*if (!pseudo) {
            setErrorPseudo('Pseudo obligatoire')
        }*/

        if (!email) {
            setErrorEmail('Email obligatoire')
        }

        if (!password) {
            setErrorPassword('Mot de passe obligatoire')
        }

        if (!email || !password) return;

        try {
          const user = await loginUser({ email, password });

          console.log("Connecté :", user);

          const me = await getMe();
          console.log("Utilisateur connecté :", me);
          onSuccess()

          //navigate("/"); //navigate("/dashboard");
        } catch (error: any) {
          setErrorPassword(error.message);
        }

        
    }

    

  return (
    

    <>
          
        <form className="register-form" onSubmit={handleSubmit}>
            {/*<div className="form-group">
                <label htmlFor="pseudo">Pseudonyme</label>
                <input 
                    id="pseudo"
                    type="text"
                    placeholder="Oclock2026"
                    value={pseudo}
                    onChange={(event) => setPseudo(event.target.value) } 
                />
                {errorPseudo && <p className="error-message">{errorPseudo}</p>}
            </div>*/}

            
            <div className="form-group">
                <div className="brand-block">
                    <div className="brand-logo">
                        <img src={crabLogo} alt="La Pince logo" />
                    </div>

                    <p className="register-subtitle">
                        Vous n'avez pas encore de compte ?{" "}
                        <a href="/register" className="inline-link">
                        S'inscrire
                        </a>
                    </p>
                </div>

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
                <div className="password-input-wrapper">
                    <input
                        id="password" 
                        type={showPassword ? "text" : "password"}
                        placeholder="**********"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword((prev) => !prev)}
                    >
                        {showPassword ? "Masquer" : "Afficher"}
                    </button>
                </div>
                    {errorPassword && <p className="error-message">{errorPassword}</p>}
                
            </div>

            <button className="primary-button" type="submit">
              Valider
            </button>

            
        </form>
    </>
  );
}



export default LoginForm;

        