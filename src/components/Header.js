import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    isLoading: true,
    userName: '',
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      isLoading: false,
      userName: user.name,
    });
  }

  render() {
    const { isLoading, userName } = this.state;
    return (
      <div data-testid="header-component">
        <p data-testid="header-user-name">
          { userName }
        </p>
        <Link to="/search" data-testid="link-to-search">Pesquisar   </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritas   </Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil   </Link>
        {isLoading && <Loading />}
      </div>
    );
  }
}

export default Header;
