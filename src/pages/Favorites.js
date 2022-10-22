import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    isLoading: true,
    favorites: [],
  };

  async componentDidMount() {
    const teste = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favorites: teste,
    }, () => console.log(teste));
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { isLoading, favorites } = this.state;
  //   if (isLoading === true) {
  //     return true;
  //   } if (favorites.length > nextState.favorites.length) {
  //     return true;
  //   }
  //   console.log('state', favorites);
  //   console.log('nextstate', nextState.favorites);
  // }

  // componentDidUpdate() {
  //   this.setState({
  //     isLoading: false,
  //   });
  // }

  handleRemove = (id) => {
    const number = 5000;
    const { favorites } = this.state;
    const myFavorite = favorites.filter((music) => music.trackId !== id);
    setTimeout(this.setState({
      favorites: myFavorite,
    }), number);
  };

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        { isLoading && <Loading />}
        <Header />
        <div>
          { favorites.map((music) => (<MusicCard
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            music={ music }
            checked
            remove={ this.handleRemove }
          />))}
        </div>
      </div>
    );
  }
}

export default Favorites;
