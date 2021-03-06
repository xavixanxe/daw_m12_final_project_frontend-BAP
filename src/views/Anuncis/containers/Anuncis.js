import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultsList from './../components/ResultsList/ResultsList';
import ResultsSearch from './../components/ResultsSearch/ResultsSearch';
import postService from '../../../services/post-service';
import './Anuncis.css';

import NavBar from '../../../components/NavBar/NavBar';

class Anuncis extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  state = {
    postalCode: '',
    distance: 30,
    data: [],
    filter: {
      babysitter: true,
      cleaner: true,
      pets: true,
      classes: true
    }
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState(
        {
          ...this.state,
          postalCode: this.props.location.state.postalCode
        },
        this.handleSearchClick
      );
    } else if (sessionStorage.getItem('lastZipcode')) {
      this.setState(
        {
          ...this.state,
          postalCode: sessionStorage.getItem('lastZipcode')
        },
        this.handleSearchClick
      );
    }
    sessionStorage.removeItem('lastZipcode');
  }

  handlePostOnClick = e => {
    const userId = e.currentTarget.getAttribute('id');
    sessionStorage.setItem('lastZipcode', this.state.postalCode);

    this.props.history.push({
      pathname: `/profile/${userId}`,
      as: '/profile'
    });
  };

  handleFilterClick = e => {
    const prop = e.currentTarget.getAttribute('id');

    this.setState(prevState => ({
      filter: {
        ...prevState.filter,
        [prop]: !prevState.filter[prop]
      }
    }));
  };

  handleSearchClick = () => {
    const token = this.props.token;
    postService
      .fetchPostByPC(this.state.postalCode, token, this.state.distance)
      .then(response => {
        this.setState({
          ...this.state,
          data: response.data.posts
        });
      });
  };

  handleInput = e => {
    this.setState({
      ...this.state,
      postalCode: e.target.value
    });
  };

  handleSelect = e => {
    this.setState({
      ...this.state,
      distance: e.target.value
    });
  };

  render() {
    return (
      <>
        <NavBar isUserLogged={!!this.props.user} />
        <section id="anuncis" className="section is-medium results-container">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column is-three-fifths is-offset-one-fifth">
                  <ResultsSearch
                    query={this.state.postalCode}
                    onFilterClick={this.handleFilterClick}
                    onSearchClick={this.handleSearchClick}
                    onInputChange={this.handleInput}
                    onSelectChange={this.handleSelect}
                    filter={this.state.filter}
                  />
                </div>
              </div>
            </div>
            <div className="container">
              <div className="columns">
                <div className="column is-three-fifths is-offset-one-fifth">
                  {!this.state.postalCode && !this.state.data.length > 0 ? (
                    <div className="ammount">
                      Fes una cerca i troba anuncis a la teva zona
                    </div>
                  ) : (
                    <ResultsList
                      results={this.state.data}
                      filter={this.state.filter}
                      handlePostOnClick={this.handlePostOnClick}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user: user.data,
  token: user.token,
  isLoading: user.isLoading
});

export default connect(mapStateToProps)(Anuncis);
