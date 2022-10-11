import React from 'react';
import { Link } from 'react-router-dom';

class Search extends React.Component {
  render() {
    return (
      <div data-testid="page-search">
        <h1>Buscar Musica</h1>
        <Link to="/"> Ir para a Home</Link>
      </div>
    );
  }
}

export default Search;
