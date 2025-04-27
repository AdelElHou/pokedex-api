import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Login';
import PokemonList from './PokemonList';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <BrowserRouter>
      {isAuthenticated && (
        <nav style={{ padding: '1rem' }}>
          <a href="/">Accueil</a> | <a href="/booster">Booster 3D</a>
        </nav>
      )}
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<PokemonList />} />
          
          </>
        ) : (
          <Route path="*" element={<Login onLogin={() => window.location.reload()} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
