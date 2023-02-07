import { setAuthToken } from '../../config/config';
import SERVER_URL from '../../config/config';

const initialState = {
    login: false
};

const authReducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            if (action.payload.token)
                setAuthToken('Bearer ' + action.payload.token);
            return {
                token: action.payload.token ? action.payload.token : state.token,
                ...action.payload.data,
                login: true,
            }
        case 'SET_COIN':
            return {
                ...state,
                metacoins: action.payload
            }
        case 'LOGOUT':
            localStorage.removeItem('token');
            return initialState;
        case 'BET':
            return {
                ...state,
                metacoins: state.metacoins - action.payload
            }
        default:
            return state || initialState;
    }
};

export default authReducer;