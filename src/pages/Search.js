import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    disabledButton: true,
    myAlbuns: [],
  };

  ableButton = () => {
    const { artistName } = this.state;
    if (artistName.length > 1) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.ableButton());
  };

  handleSearch = async () => {
    const albuns = await searchAlbumsAPI();
    this.setState({
      artistName: '',
      myAlbuns: albuns,
    });
  };

  render() {
    const { artistName, disabledButton, myAlbuns } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Buscar Musica</h1>
        <form>
          <input
            type="text"
            name="artistName"
            data-testid="search-artist-input"
            value={ artistName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ disabledButton }
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
          { myAlbuns.length === 0
            ? <h3>Nenhum álbum foi encontrado</h3>
            : myAlbuns.map((album) => (
              <div key={ album.collectionId }>
                { album.collectionName }
              </div>))}
        </form>
        <Link to="/"> Ir para a Home</Link>
      </div>
    );
  }
}

export default Search;
