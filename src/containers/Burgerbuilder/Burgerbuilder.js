import React,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';


class Burgerbuilder extends Component {
 
    state = {
        purchasing:false
    };
    

    componentDidMount() 
    {
        this.props.initIngredients();
    }
    
    
    purchaseHandler = () => {
        const ingredients = {
            ingredients:this.props.ingredients
            
        }
        axios.post('/ingredients.json',ingredients).then(console.log('success'));
        this.setState({purchasing:true});
    }
    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0; 


    }
    
    render() {
        let orderSummary = null;
        let burger = null;
        let error = <p>can't load data network error</p>;
        
        
        if ( this.props.ingredients && !(this.props.error) ){
            burger = (
                <div>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered = {this.purchaseHandler}
                        
                        price={this.props.price} />
                </div>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
            error = null;
        }
        // {salad: true, meat: false, ...}
        return (
            <div>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
                {error}
            </div>
        );
    }
}

const mapstateToProps = (store) => {
    return(
        {
            ingredients:store.Burger.ingredients,
            price:store.Burger.totalPrice,
            error:store.Burger.error

        });
    
};


export default connect(mapstateToProps,actions)(Burgerbuilder);