import axios from 'axios';

export const loginAction = (payload) => dispatch => {
    console.log('here')
    axios.post('/login', payload)
        .then(res => {
            console.log(res)
            if (res.status == 200) {
                dispatch({type: 'SET_USER', payload:res.data});
            }
        });
}

export const registerAction = (payload) => dispatch => {
    axios.post('/register', payload)
        .then(res => {
            if (res.status == 200) {
                dispatch({type: 'SET_USER', payload:res.data});
            }
        });
}

export const logoutAction = () => dispatch => {
    axios.get('/logout')
        .then(res => {
            dispatch({type: 'LOGOUT'});
        });
        
}

export const getCurrentUserAction = () => dispatch => {
    axios.post('/getcurrentuser')
        .then(res => {
            if (res.status == 200) {
                dispatch({type: 'SET_USER', payload:res.data});
                const user = res.data.user;
                if (user.email_verified_at) {
                    const verify = localStorage.getItem('verify');
                    if (!verify)
                        dispatch({type: 'ADD_MESSAGE', payload: {appearance: 'success', content: 'Email Confirmed. Your Profile is Live!'}});
                    localStorage.setItem('verify', true);
                }
            }
            else dispatch({type: 'ADD_MESSAGE', payload: {appearance: 'error', content: res.response.data.message}});
        });
}