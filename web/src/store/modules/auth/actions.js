import { addTokenLocalStorege } from '../../../util/authUtil';

export function addTokenLogin(token) {
    addTokenLocalStorege(token);
    return {
        type: '@ADD_TOKEN_LOGIN',
        payload: token,
    };
}

export function removeTokenLogout(token) {
    return {
        type: '@REMOVE_TOKEN_LOGIN',
        payload: token,
    };
}
