import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startLogin } from '../actions/auth';

export const LoginPage = (props) => (
  <div className="box-layout">
    <div className="box-layout__box">
      <h1 className="box-layout__title">Expensify</h1>
      <p>It&apos;s time to get your expenses under control</p>
      <button
        type="submit"
        onClick={props.startLogin}
        className="button"
      >
        Login with Google
      </button>
    </div>
  </div>
);

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ startLogin }, dispatch)
);

export default connect(undefined, mapDispatchToProps)(LoginPage);
