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
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: 'AUTH_LOGOUT'
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: 'SET_AUTH_REDIRECT_PATH',
        path: path
    };
};



export const auth = (email, password, isSignup) => {
    return dispatch => {
        
        dispatch(authStart());
        
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyA3H-l-UfVr-l_SvX5PkKmYt1LdgeF-DvM';
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyA3H-l-UfVr-l_SvX5PkKmYt1LdgeF-DvM';
        }
        axios.post(url, authData)
            .then(response => {
                console.log('success');
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log('failed');
                console.log(err);
                dispatch(authFail(err));
            });
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    };
};


    