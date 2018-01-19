import React,{Component} from 'react';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

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
                    required:true
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
                    isEmail:true
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
                    isContact:true
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
                    required:true
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
        }
    }
    inputChangedHandler = (event,inputIdentifier) => {
        
        const updatedForm = {...this.state.orderForm,[inputIdentifier]:{
            ...this.state.orderForm[inputIdentifier],value:event.target.value
        }};
        
        console.log({updatedForm});
        this.setState({orderForm:updatedForm});
       


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
            orderData:orderForm
        };
        axios.post('/orders.json',orderDetails).then(console.log('successAgain'));
        
        
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
                <Button btnType = 'Success' clicked = {this.orderHandler}>Order</Button>
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
export default ContactData;