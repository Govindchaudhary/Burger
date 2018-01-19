import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ContactData from './ContactData/ContactData';


class Checkout extends Component {
    componentDidMount() {
        console.log(this.props);
    }

    onCheckoutCancelled = () => {
        
        this.props.history.goBack();
    }
    onCheckoutContinue = () => {
        this.props.purchaseSuccess();
    }
    
    

    render() {
        let form = null;
        if(this.props.purchased) {
            form = <ContactData 
            ingredients = {this.props.ingredients}
            price = {this.props.price}/>
        }
       
   
       
        return(
            <div>
             <CheckoutSummary
             ingredients = {this.props.ingredients}
             cancel = {this.onCheckoutCancelled}
             continue = {this.onCheckoutContinue}/>
             {form}
            </div>
        );
    }
}
const matchstateToProps = (store) => {
    return({
        ingredients:store.Burger.ingredients,
        price:store.Burger.totalPrice,
        purchased:store.Order.purchased
        
    });
}

export default connect(matchstateToProps,actions)(Checkout);