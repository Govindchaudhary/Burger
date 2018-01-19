import React from 'react';
import Burger from '../../Burger/Burger';

import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return(
        <div className = {classes.CheckoutSummary}>
            <h1>We hope it tastes well</h1>
            <div style={{width: '100%', margin: 'auto'}}>
            <Burger ingredients = {props.ingredients}/>
            </div>
            <div>
            <Button 
            btnType = 'Danger'
             clicked = {props.cancel}>
             CANCEL
             </Button>
            <Button btnType = 'Success' clicked = {props.continue}>CONTINUE</Button>
            </div>
            
            
            
        </div>
    );
};




export default CheckoutSummary;