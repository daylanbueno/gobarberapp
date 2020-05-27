import React from 'react';
import { useHistory } from 'react-router-dom';

import { Input, Form } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Container } from './styles';
import {
    addUsuarioLogado,
    removerUsuarioLogado,
} from '../../store/modules/auth/user/actions';
import { removeTokenLogout } from '../../store/modules/auth/actions';
import api from '../../services/api';

export default function Profile() {
    const history = useHistory();
    const profile = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSubmit = async (data) => {
        const response = await api.put('users', data);
        dispatch(addUsuarioLogado(response.data));
        toast.success('Perfil atualizado com sucesso');
    };

    const handleLogout = () => {
        dispatch(removerUsuarioLogado());
        dispatch(removeTokenLogout());
        history.push('/');
    };

    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <Input type="text" name="nome" placeholder="Nome completo" />
                <Input type="email" name="email" placeholder="Seu e-mail" />

                <Input
                    type="password"
                    name="oldPassword"
                    placeholder="Sua senha atual"
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Sua senha nova"
                />
                <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                />
                <button type="submit">Atualizar</button>
            </Form>
            <div>
                <button onClick={() => handleLogout()} type="submit">
                    Sair do sistema
                </button>
            </div>
        </Container>
    );
}
