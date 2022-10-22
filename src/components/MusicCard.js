import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../Loading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFavorite: props.checked,
      // favoriteSongs: [],
      isLoading: false,
    };
  }

  handleChange = ({ target }) => {
    // const { isFavorite } = this.state;
    const { name } = target;
    const { music, remove } = this.props;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log('remove', remove);
    this.setState({
      [name]: value,
    }, async () => {
      const { isFavorite } = this.state;
      console.log(isFavorite);
      if (isFavorite === true) {
        this.setState({
          isLoading: true,
        });
        await addSong(music);
        this.setState({
          isLoading: false,
        });
      } else {
        this.setState({
          isLoading: true,
        });
        await removeSong(music);
        if (typeof remove === 'function') { remove(music.trackId); }
        this.setState({
          isLoading: false,
        });
      }
    });
  };

  // handleChange = () => console.log('change');

  render() {
    const { trackName, previewUrl, trackId, music } = this.props;
    const { isFavorite, isLoading } = this.state;
    return (
      <div>
        { isLoading ? <Loading /> : null}
        <h3>
          {trackName}
        </h3>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          Favorita
          <input
            id={ trackId }
            name="isFavorite"
            type="checkbox"
            checked={ isFavorite }
            onChange={ this.handleChange }
            music={ music }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.objectOf(PropTypes.string).isRequired,
  checked: PropTypes.bool.isRequired,
  remove: PropTypes.func,
};
MusicCard.defaultProps = {
  remove: undefined,
};

export default MusicCard;
