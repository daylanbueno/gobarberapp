export function addUsuarioLogado(user) {
    return {
        type: '@ADD_USUARIO_LOGADO',
        payload: user,
    };
}

export function removerUsuarioLogado(user) {
    return {
        type: '@REMOVE_TOKEN_LOGIN',
        payload: user,
    };
}
