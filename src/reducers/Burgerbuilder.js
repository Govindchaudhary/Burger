const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4,
    purchasing:false,
    error:false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

export const Burgerbuilder = ( state = initialState, action ) => {
    switch ( action.type ) {
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
            };
        case 'REMOVE_INGREDIENT':
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload]: state.ingredients[action.payload] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
            };


            case 'SET_INGREDIENT':
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice: 4,
                error: false,
                building: false
            };
            case 'FETCH_INGREDIENTS_FAILED':
            return {
                ...state,
                error:true
            };

            
        default:
            return state;
    }
};

