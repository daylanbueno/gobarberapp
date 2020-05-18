import { addUserLocalStorege } from '../../../../util/authUtil';

export function addUsuarioLogado(user) {
    addUserLocalStorege(user);
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
