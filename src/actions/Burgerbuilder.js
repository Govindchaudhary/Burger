import axios from 'axios';
export const addIngredient = (name) => {
    return(
        {
            type:'ADD_INGREDIENT',
            payload:name
        }
    );
};
export const removeIngredient = (name) => {
    return(
        {
            type:'REMOVE_INGREDIENT',
            payload:name
        }
    );
};

export const setIngredients = ( ingredients ) => {
    return {
        type: 'SET_INGREDIENTS',
        payload: ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: 'FETCH_INGREDIENTS_FAILED'
    };
};

export const initIngredients = () => {
    return dispatch => {
        axios.get( 'https://burger-d90ae.firebaseio.com/ingredients.json' )
            .then( response => {
               dispatch(setIngredients(response.data));
               console.log(response.data);
            } )
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    };
};
