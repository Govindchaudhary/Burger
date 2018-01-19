import axios from '../axios-orders';
export const purchaseSuccess = () => {
    return({
        type:'PURCHASE_SUCCESS',

    });
};

export const purchaseFailure = () => {
    return({
        type:'PURCHASE_FAILURE',

    });
};

export const fetchOrderSuccess = (orders) => {
    return({
        type:'FETCH_ORDER_SUCCESS',
        payload:orders
    });
};

export const fetchOrderFail = () => {
    return({
        type:'FETCH_ORDER_FAIL'
    });
}

export const fetchOrder = () => {
    return dispatch => {
        axios.get( '/orders.json' )
        .then(response => {
            const fetchedOrders = [];
                for ( let key in response.data ) {
                    fetchedOrders.push( {
                        ...response.data[key],
                        id: key
                    } );
                }
            dispatch(fetchOrderSuccess(fetchedOrders));
        }).catch(error => dispatch(fetchOrderFail()))
    }
}