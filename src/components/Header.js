import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startLogout } from '../actions/auth';

export const Header = (props) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button
          type="submit"
          onClick={props.startLogout}
          className="button button--link"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ startLogout }, dispatch)
);

export default connect(undefined, mapDispatchToProps)(Header);
