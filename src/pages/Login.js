import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    disableButton: true,
    userName: '',
    isLoading: false,
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => this.ableButton());
  };

  ableButton = () => {
    const { userName } = this.state;
    if (userName.length > 2) {
      this.setState({
        disableButton: false,
      });
    } else {
      this.setState({
        disableButton: true,
      });
    }
  };

  handleClick = async () => {
    const { history: { push } } = this.props;
    const { userName } = this.state;
    this.setState({
      isLoading: true,
    });
    await createUser({ name: userName });
    push('/search');
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { disableButton, userName, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <h1> LogIn </h1>
          <input
            type="text-area"
            name="userName"
            data-testid="login-name-input"
            value={ userName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ disableButton }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
        {isLoading && <Loading />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.symbol.isRequired,
};
export default Login;
