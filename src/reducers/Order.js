const initialState = {
    orders:[],
    purchased:false,
    loading:true
    
};

export const Order = (state=initialState,action) => {
   switch(action.type) {
      case 'PURCHASE_BURGER_START':
        return({...state,loading:true});

       case 'PURCHASE_SUCCESS' :
          return({...state,
            purchased:true,
            loading:false,
            orders:state.orders.concat({...action.orderData,id:action.orderId})
        });
       case 'FETCH_ORDER_START':
          return({...state,loading:true});
       case 'FETCH_ORDER_SUCCESS':
       return({...state,loading:false,orders:action.payload});
       case 'FETCH_ORDER_FAIL':
       return({...state,loading:false});

          
        default:
        return state;
   }
};
