import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

export default function Signin() {
    return (
        <>
            <img src={logo} alt="Gobarber" />
            <form>
                <input type="email" placeholder="Seu e-mail" />
                <input type="password" placeholder="Sua senha secreta" />
                <button type="submit">Acessar</button>
                <Link to="register">Cria sua conta gratuita</Link>
            </form>
        </>
    );
}
