import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import logo from '../../assets/logo.svg';

export default function SignUp() {
    function handleSubmit(data) {
        console.log('data', data);
    }

    return (
        <>
            <img src={logo} alt="Gobarber" />
            <Form onSubmit={handleSubmit}>
                <Input name="nome" placeholder="Nome completo" />
                <Input name="email" type="email" placeholder="Seu e-mail" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua senha secreta"
                />
                <button type="submit">Acessar</button>
                <Link to="/">Já tenho login</Link>
            </Form>
        </>
    );
}
