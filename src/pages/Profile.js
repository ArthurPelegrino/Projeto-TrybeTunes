import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="edit"> Editar </Link>
      </div>
    );
  }
}

export default Profile;
