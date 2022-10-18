import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    disabledButton: true,
    myAlbuns: [],
    searchResults: '',
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
    const { artistName } = this.state;
    const albuns = await searchAlbumsAPI(artistName);
    this.setState((prevState) => (
      {
        artistName: '',
        myAlbuns: albuns,
        searchResults: prevState.artistName,
      }
    ));
    console.log(artistName);
  };

  render() {
    const { artistName, disabledButton, myAlbuns, searchResults } = this.state;
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
            : (
              <div>
                <h1>
                  {`Resultado de álbuns de: ${searchResults}`}
                </h1>
                {myAlbuns.map((album) => (
                  <div key={ album.collectionId }>
                    { album.collectionName }
                    <Link
                      to={ `/album/${album.collectionId}` }
                      data-testid={ `link-to-album-${album.collectionId}` }
                    >
                      {album.collectionId}
                    </Link>

                  </div>
                ))}
              </div>
            )}
        </form>
      </div>
    );
  }
}

export default Search;
