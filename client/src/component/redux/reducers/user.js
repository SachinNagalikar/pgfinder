import isEmpty from 'lodash/isEmpty';
import jwtDecode from 'jwt-decode'

const token = localStorage.token

let initialState
if (token) {
    const user = jwtDecode(token)
    initialState = {
        isAuthenticated: true,
        user: user,
    };
} else {
    initialState = {}
}

const userReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'SET_USER':
            const user = jwtDecode(action.user)
            return {
                isAuthenticated: !isEmpty(action.user),
                user: user
            };
        case 'REMOVE_USER':
            return {
                isAuthenticated: !isEmpty(action.user),
                user: user
            }
        default: return state;
    }
}
export default userReducer