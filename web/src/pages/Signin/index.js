import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';
import * as yup from 'yup';
import logo from '../../assets/logo.svg';
import { addTokenLogin } from '../../store/modules/auth/actions';
import { addUsuarioLogado } from '../../store/modules/auth/user/actions';
import api from '../../services/api';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    password: yup.string().required('A senha é obrigatória'),
});

export default function Signin() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    async function handleSubmit(data) {
        try {
            setLoading(true);
            const response = await api.post('/sessions', data);
            const { token = '', newUser } = response.data;
            setLoading(false);
            if (!newUser.provider) {
                toast.error('Usuário não é um prestador de serviço');
                return;
            }
            if (token) {
                dispatch(addTokenLogin({ token }));
                dispatch(addUsuarioLogado(newUser));
            }
        } catch (e) {
            setLoading(false);
            const { data: errorData } = e.response;
            toast.error(errorData);
        }
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
                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar'}
                </button>
                <Link to="register">Cria sua conta gratuita</Link>
            </Form>
        </>
    );
}
