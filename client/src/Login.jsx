// src/Login.jsx
import React, { useState } from 'react';
import './Login.css'; // Si tu veux ajouter du style

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    const endpoint = isRegistering ? '/api/register' : '/api/login';

    try {
      const res = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || "Erreur lors de l'opération.");
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userEmail', data.user.email);
        onLogin(data.user);
      }
    } catch (err) {
      console.error("Erreur réseau :", err);
      setErrorMsg("Impossible de contacter le serveur.");
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegistering ? 'Inscription' : 'Connexion'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {errorMsg && <p className="error-message">{errorMsg}</p>}
        <button type="submit">
          {isRegistering ? "S'inscrire" : "Se connecter"}
        </button>
      </form>
      <button 
        className="switch-mode" 
        onClick={() => setIsRegistering(!isRegistering)}
      >
        {isRegistering ? 
          "Déjà un compte ? Connectez-vous" : 
          "Pas de compte ? Inscrivez-vous"}
      </button>
    </div>
  );
};

export default Login;
