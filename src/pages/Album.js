import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class Album extends React.Component {
  state = {
    // artist: [],
    artistName: '',
    albumName: '',
    musicTracks: [],
    isLoading: false,
    favoriteTracks: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumId = await getMusics(id);
    this.setState(
      {
      // artist: albumId,
        artistName: albumId[0].artistName,
        albumName: albumId[0].collectionName,
        musicTracks: albumId.slice(1),
      },
      console.log(albumId),
    );
    this.setState({
      isLoading: true,
    });
    const favorites = await getFavoriteSongs();
    this.setState({
      isLoading: false,
      favoriteTracks: favorites,
    }, console.log('favoritou'));
  }

  render() {
    const { artistName, albumName, musicTracks, isLoading, favoriteTracks } = this.state;
    if (isLoading) {
      return <Loading />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <div>
          <h2 data-testid="artist-name">{artistName}</h2>
          <h5 data-testid="album-name">{`Album: ${albumName}`}</h5>
        </div>
        <div />
        { musicTracks.map((music) => (<MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          trackId={ music.trackId }
          music={ music }
          checked={ favoriteTracks.some((track) => track.trackId === music.trackId) }
        />))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
