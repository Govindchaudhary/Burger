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
          return({...state,token:action.idToken,userId:action.userId,error:null,loading:false});
        case 'AUTH_FAIL':
          return({...state,loading:false,error:action.error});
        
        case 'AUTH_LOGOUT':
          return({...state,token:null,userId:null});
        case 'SET_AUTH_REDIRECT_PATH':
          return({...state,authRedirectPath:action.path});
        default:
        return state;
    }

}