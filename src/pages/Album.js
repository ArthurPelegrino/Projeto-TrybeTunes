import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    artist: [],
  };

  // async componentDidMount() {
  //   const { match: { params: { id } } } = this.props;
  //   const albumId = await getMusics(id);
  //   this.setState({
  //     artist: albumId,
  //   });
  //   console.log(albumId);
  // }

  render() {
    const { artist } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        <ul data-testid="artist-name">
          <li data-testid="artist-name">{artist}</li>
          <li data-testid="album-name">a</li>
        </ul>
      </div>
    );
  }
}

export default Album;
