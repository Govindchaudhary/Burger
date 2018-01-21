import React,{Component} from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

import * as actions from '../../../actions';
import {connect} from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:' Name'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5
                },
                valid:false,
                touched:false
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:' E-mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true,
                    minLength:12
                    
                },
                valid:false,
                touched:false
            },
            contact:{
                elementType:'input',
                elementConfig:{
                    type:'number',
                    placeholder:' Contact Number'
                },
                value:'',
                validation:{
                    required:true,
                    isContact:true,
                    minLength:10,
                    maxLength:10
                },
                valid:false,
                touched:false
            },
            address:{
                elementType:'textarea',
                elementConfig:{
                    type:'text',
                    placeholder:'Address'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:10
                },
                valid:false,
                touched:false
            },
            deliveryMethod:{
                elementType:'select',
                elementConfig:{
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                valid:false,
                touched:false
            }
        },
        formIsValid:false
    }
   
    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isContact ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event,inputIdentifier) => {
        
        const updatedForm = {...this.state.orderForm,[inputIdentifier]:{
            ...this.state.orderForm[inputIdentifier],value:event.target.value,
            valid: this.checkValidity( event.target.value, this.state.orderForm[inputIdentifier].validation ),
            touched: true
        }};
        
        console.log({updatedForm});
        this.setState({orderForm:updatedForm});
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedForm, formIsValid: formIsValid});
       
 }
    orderHandler = (event) => {
        event.preventDefault();
        const orderForm = {
            name:this.state.orderForm.name.value,
            email:this.state.orderForm.email.value,
            contact:this.state.orderForm.contact.value,
            address:this.state.orderForm.address.value,
            deliveryMethod:this.state.orderForm.deliveryMethod.value
        };
        const orderDetails = {
            price:this.props.price,
            ingredients:this.props.ingredients,
            orderData:orderForm,
            userId: this.props.userId
        };
        
        console.log(this.props.token);
        this.props.purchaseBurger(orderDetails,this.props.token);
       
        
    }
    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler} >
                {formElementsArray.map(formElement => (
                    <Input
                    key = {formElement.id}
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed = {(event) => this.inputChangedHandler(event,formElement.id)}
                    />

                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        
            return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
                
            </div>
        );
        

    }
    
}
const mapStateToProps = state => {
    return {
        
        token: state.Auth.token,
        userId: state.Auth.userId
    }
};
export default connect(mapStateToProps,actions) (ContactData);