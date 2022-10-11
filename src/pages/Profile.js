import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Link to="edit"> Editar </Link>
      </div>
    );
  }
}

export default Profile;
