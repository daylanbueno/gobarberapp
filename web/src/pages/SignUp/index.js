import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';

import logo from '../../assets/logo.svg';

const schema = yup.object().shape({
    nome: yup.string().required('O nome é obrigatório'),
    email: yup
        .string()
        .email('E-mail inválido!')
        .required('O E-mail é obrigatóri'),
    password: yup.string().required('A senha é obrigatória'),
});

export default function SignUp() {
    function handleSubmit(data) {
        console.log('data', data);
    }

    return (
        <>
            <img src={logo} alt="Gobarber" />
            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="nome" placeholder="Nome completo" />
                <Input name="email" type="text" placeholder="Seu e-mail" />
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
