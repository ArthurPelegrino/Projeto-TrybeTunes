import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    return (
      <div>
        <h1> TrybeFy </h1>
        <Link to="/">Home</Link>
        <Link to="/favorites"> Favoritas </Link>
        <Link to="/album"> Albuns </Link>
        <Link to="/search"> Procurar </Link>
        <Link to="/profile/"> Perfil </Link>
      </div>
    );
  }
}

export default Menu;
