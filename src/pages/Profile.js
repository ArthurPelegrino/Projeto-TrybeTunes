import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../Loading';
import { getUser } from '../services/userAPI';

// commit

class Profile extends React.Component {
  state = {
    isLoading: false,
    myData: [],
  };

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });
    const user = await getUser();
    this.setState({
      isLoading: false,
      myData: user,
    }, () => console.log(user));
  }

  render() {
    const { isLoading, myData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          isLoading ? <Loading />
            : (
              <div>
                <div>
                  <h4> Name </h4>
                  <h6>
                    {myData.name}

                  </h6>
                </div>
                <img
                  data-testid="profile-image"
                  src={ myData.image }
                  alt={ myData.name }
                />
                <div>
                  <h4>E-mail</h4>
                  <h6>{myData.email}</h6>
                </div>
                <div>
                  <h4>Description</h4>
                  <h6>{myData.description}</h6>
                </div>
              </div>
            )
        }
        <Link to="profile/edit"> Editar perfil </Link>
      </div>
    );
  }
}

export default Profile;
