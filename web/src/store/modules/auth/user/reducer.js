const INITIAL_STATE = {
    nome: null,
    email: null,
    avatar: null,
    provider: null,
};

export default function user(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@ADD_USUARIO_LOGADO':
            return {
                ...state,
                nome: action.payload.nome,
                email: action.payload.email,
                provider: action.payload.provider,
                avatar: action.payload.avatar,
            };

        case '@REMOVER_USUARIO_LOGADO':
            return {
                ...state,
                INITIAL_STATE,
            };

        default:
            return state;
    }
}
