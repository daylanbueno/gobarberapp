import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';
import logo from '../../assets/logo.svg';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
});

export default function Signin() {
    async function handleSubmit(data) {
        console.log('data', data);
    }

    return (
        <>
            <img src={logo} alt="Gobarber" />
            <Form schema={validationSchema} onSubmit={handleSubmit}>
                <Input name="email" type="text" placeholder="Seu e-mail" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua senha secreta"
                />
                <button type="submit">Acessar</button>
                <Link to="register">Cria sua conta gratuita</Link>
            </Form>
        </>
    );
}
