import {
    addUserLocalStorege,
    limparLocalStorege,
} from '../../../../util/authUtil';

export function addUsuarioLogado(user) {
    addUserLocalStorege(user);
    return {
        type: '@ADD_USUARIO_LOGADO',
        payload: user,
    };
}

export function removerUsuarioLogado(user) {
    limparLocalStorege();
    return {
        type: '@REMOVER_USUARIO_LOGADO',
        payload: user,
    };
}
