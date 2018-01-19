import axios from 'axios';

export const authStart = () => {
    return({
        type:'AUTH_START'
    });
}

export const authSuccess = (token,userId) => {
    return({
        type:'AUTH_SUCCESS',
        idToken:token,
        userId:userId

    });
}
export const authFail = (error) => {
    return({
        type:'AUTH_FAIL',
        error:error
    });
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        
        dispatch(authStart());
        
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        const headers = {
            'Content-Type': 'application/json'
             
        }
        
           const url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA3H-l-UfVr-l_SvX5PkKmYt1LdgeF-DvM';
        
        axios.post(url, authData)
            .then(response => {
                console.log('success');
                console.log(response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log('failed');
                console.log(err);
                dispatch(authFail(err));
            });
    };
};


    