import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';


import classes from './Layout.css';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <div>
                <Toolbar
                    
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth = {this.props.isAuth} />
                <SideDrawer
                    isAuth = {this.props.isAuth}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
const mapStateToProps = (store) => {
    return({
        isAuth:store.Auth.token!==null
    })
}



export default  connect(mapStateToProps)(Layout) ;