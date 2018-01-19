import React,{Component} from 'react';
import Layout from './components/Layout/Layout';
import Burgerbuilder from './containers/Burgerbuilder/Burgerbuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Orders from './containers/Order/Order';
import Checkout from './containers/Checkout/Checkout';
import Auth from './containers/Auth/Auth';

class App extends Component {
  
  render() {
    
    let routes = (
      <Switch>
        
        <Route path="/" exact component={Burgerbuilder} />
        <Route path="/orders" exact component={Orders} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    return(
     
          <Layout>
             {routes}
          </Layout>
        
      
    );
  };
}
export default withRouter(App);
