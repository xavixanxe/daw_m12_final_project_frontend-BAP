import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as userActionCreators from '../../../../store/user/actions';

import NavBar from '../../../../components/NavBar/NavBar';
import SignupForm from '../SignupForm/SignupForm';

class Signup extends Component {
  static propTypes = {
    handleSignup: PropTypes.func.isRequired,
    isLogin: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired
  };
  handleSubmit = ({
    username,
    name,
    surname,
    postalCode,
    email,
    password
  }) => e => {
    e.preventDefault();
    //send location instead of postalCode ("00000000Mn")
    const location = {
      lat: 123456,
      lng: 123456
    };
    this.props
      .handleSignup({ username, name, surname, email, password, location })
      .then(() => {
        this.props.history.replace('/anuncis');
      });
  };

  render() {
    return (
      <>
        <NavBar showIcon={false} />
        <SignupForm handleSubmit={this.handleSubmit} />
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  isLogin: user.isLogin,
  error: user.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(userActionCreators, dispatch);

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Signup)
);
