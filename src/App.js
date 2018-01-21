import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Orders from './containers/Order/Order';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './actions';



class App extends Component {
  componentDidMount () {
    this.props.authCheckState ();
  }

  render () {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Burgerbuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={Burgerbuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.Auth.token !== null
  };
};



export default withRouter( connect( mapStateToProps, actions )( App ) );
