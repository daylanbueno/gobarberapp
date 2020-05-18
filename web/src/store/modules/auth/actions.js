export function addTokenLogin(token) {
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
