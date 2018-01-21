import axios from '../axios-orders';
export const purchaseSuccess = (id,orderData) => {
    return({
        type:'PURCHASE_SUCCESS',
        orderId:id,
        orderData:orderData

    });
};

export const purchaseFailure = () => {
    return({
        type:'PURCHASE_FAILURE',

    });
};

export const purchaseBurger = ( orderData, token ) => {
    return dispatch => {
        
        axios.post( '/orders.json?auth=' + token, orderData )
            .then( response => {
                dispatch( purchaseSuccess( response.data.name, orderData ) );
            } )
            .catch( error => {
                dispatch( purchaseFailure( error ) );
            } );
    };
};
export const fetchOrdersStart = () => {
    return({
        type:'FETCH_ORDER_START'
    });
}

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

export const fetchOrder = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get( '/orders.json' + queryParams )
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