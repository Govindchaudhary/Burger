const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

export const Auth = (state=initialState,action) => {
    switch(action.type) {
        case 'AUTH_START':
          return({...state,loading:true,error:null});
        case 'AUTH_SUCCESS':
          return({...state,token:action.token,userId:action.userId,error:null,loading:false});
        case 'AUTH_FAIL':
          return({...state,loading:false,error:action.error});
        default:
        return state;
    }

}