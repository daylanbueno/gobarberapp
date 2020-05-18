import React from 'react';
import { toast } from 'react-toastify';

import { Link, useHistory } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';
import api from '../../services/api';
import logo from '../../assets/logo.svg';

const schema = yup.object().shape({
    nome: yup.string().required('O nome é obrigatório'),
    email: yup
        .string()
        .email('E-mail inválido!')
        .required('O E-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
});

export default function SignUp() {
    const history = useHistory();
    async function handleSubmit({ nome, email, password }) {
        try {
            const user = {
                nome,
                email,
                password,
                provider: true,
            };
            const response = await api.post('/users', user);
            if (response.data) {
                toast.success('Operação realizada com sucesso!');
                history.push('/');
            }
        } catch (e) {
            const { data: errorBackEnd } = e.response;
            toast.error(errorBackEnd.error);
        }
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
                <button type="submit">Salvar</button>
                <Link to="/">Já tenho login</Link>
            </Form>
        </>
    );
}
