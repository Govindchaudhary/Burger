import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class Auth extends Component {
    state = {
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:' E-mail'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:' Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                valid:false,
                touched:false
            }
           
           
        },
        isSignUp:true
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

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }
    inputChangedHandler = (event,inputIdentifier) => {
        
        const updatedForm = {...this.state.controls,[inputIdentifier]:{
            ...this.state.controls[inputIdentifier],
            value:event.target.value,
            valid: this.checkValidity( event.target.value, this.state.controls[inputIdentifier].validation ),
            touched: true
        }};
        
        console.log({updatedForm});
        this.setState({controls:updatedForm});
    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log('clicked');
        this.props.auth(this.state.controls.email.value,this.state.controls.password.value,this.state.controls.isSignUp);

    }
    
    render() {
        const formElementsArray = [];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = (
            <form >
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
                <Button btnType = 'Success' clicked = {this.submitHandler} >Log In</Button>
            </form>
        );
        
            return (
            <div className={classes.Auth}>
                <h4>Log In or create a new account</h4>
                {form}
            </div>
        );
        

    }
    
}
const mapStateToProps = (store) => {
    return({
        token:store.Auth.token,
        userId:store.Auth.userId,
        loading:store.Auth.loading,
        error:store.Auth.error
    });


}

export default connect(mapStateToProps,actions)(Auth);