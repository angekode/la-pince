import { useNavigate } from "react-router-dom";


export default function Home() {

  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>

      <h1>Bienvenue</h1>

      <button
        onClick={() => navigate("/register")}
        style={{ padding: "12px 20px", fontSize: "16px" }}
      >
        Register
      </button>
    </div>
  );
}