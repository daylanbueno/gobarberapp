const userStorege = JSON.parse(localStorage.getItem('usuarioLogado'));
const INITIAL_STATE = {
    nome: userStorege && userStorege.nome,
    email: userStorege && userStorege.email,
    avatar: userStorege && userStorege.avatar,
    provider: userStorege && userStorege.provider,
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
                nome: null,
                email: null,
                provider: null,
                avatar: null,
            };

        default:
            return state;
    }
}
