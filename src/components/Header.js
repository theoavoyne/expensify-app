import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startLogout } from '../actions/auth';

export const Header = (props) => (
  <header>
    <h1>Expensify</h1>
    <NavLink to="/dashboard" activeClassName="is-active" exact>Dashboard</NavLink>
    <NavLink to="/create" activeClassName="is-active" exact>Create</NavLink>
    <button type="submit" onClick={props.startLogout}>Logout</button>
  </header>
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ startLogout }, dispatch)
);

export default connect(undefined, mapDispatchToProps)(Header);
