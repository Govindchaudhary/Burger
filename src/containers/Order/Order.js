import React,{Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import {connect} from 'react-redux';
import * as actions from '../../actions';
import Order from '../../components/Order/Order';

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrder();
    }
    render() {
        let order = <Spinner/>;
        if(!this.props.loading) {
            order = this.props.orders.map(order =>(
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))
        }
        return(
            <div>
                {order}
            </div>
        );
    }
}

const mapstateToProps = (store) => {
    return(
        {
            orders:store.Order.orders,
            price:store.Order.purchased,
            loading:store.Order.loading

        });
    
};

export default connect(mapstateToProps,actions)(Orders);