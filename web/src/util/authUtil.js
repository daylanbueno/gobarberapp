export function addTokenLocalStorege(token) {
    localStorage.setItem('token', JSON.stringify(token));
}

export function addUserLocalStorege(user) {
    localStorage.setItem('usuarioLogado', JSON.stringify(user));
}

export function limparLocalStorege() {
    localStorage.clear();
}
