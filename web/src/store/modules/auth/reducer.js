const tokeArmazenado = localStorage.getItem('token');
const INITIAL_STATE = {
    token: tokeArmazenado || null,
    isAutenticado: !!tokeArmazenado,
};

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@ADD_TOKEN_LOGIN':
            return {
                ...state,
                token: action.payload.token,
                isAutenticado: true,
            };

        case '@REMOVE_TOKEN_LOGIN':
            return {
                ...state,
                token: '',
                isAutenticado: '',
            };

        default:
            return state;
    }
}
