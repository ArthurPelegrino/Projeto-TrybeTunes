import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    // artist: [],
    artistName: '',
    albumName: '',
    musicTracks: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const albumId = await getMusics(id);
    this.setState({
      // artist: albumId,
      artistName: albumId[0].artistName,
      albumName: albumId[0].collectionName,
      musicTracks: albumId.slice(1),
    });
  }

  render() {
    const { artistName, albumName, musicTracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <ul>
          <li data-testid="artist-name">{artistName}</li>
          <li data-testid="album-name">{albumName}</li>
        </ul>
        <div />
        { musicTracks.map((music) => (<MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
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
