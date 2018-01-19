import {combineReducers} from 'redux';
import {Burgerbuilder} from './Burgerbuilder';
import {Order} from './Order';
import {Auth} from './Auth';





export const allReducers = combineReducers({
    Burger:Burgerbuilder,
    Order:Order,
    Auth:Auth
    
   
});