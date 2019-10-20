import React, { Component } from 'react';
//import PropTypes from 'prop-types';

import NavBar from '../../../shared-components/NavBar/NavBar';
import LoginForm from '../LoginForm/LoginForm';

class Login extends Component {
  render() {
    return (
      <>
        <NavBar showIcon={false} />
        <LoginForm />
      </>
    );
  }
}

export default Login;
