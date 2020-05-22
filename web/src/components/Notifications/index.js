/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useMemo } from 'react';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { MdNotifications } from 'react-icons/md';
import { toast } from 'react-toastify';

import api from '../../services/api';

import {
    Container,
    Badge,
    NotificationList,
    Notification,
    Scroll,
} from './styles';

function Notifications() {
    const [visivel, setVisivel] = useState(false);
    const [notificacoes, setNotificacoes] = useState([]);

    const marcaNotificacaoComoLida = async (id) => {
        try {
            await api.put(`notifications/${id}`);

            setNotificacoes(
                notificacoes.map((notificacao) =>
                    notificacao._id === id
                        ? { ...notificacao, read: true }
                        : notificacao
                )
            );
        } catch (e) {
            toast.error(e.response.data);
        }
    };

    const recuperaNotificacoes = async () => {
        try {
            const response = await api.get('notifications');

            const listaNotificacoes = response.data.map((notificacao) => ({
                ...notificacao,
                timeDistance: formatDistance(
                    parseISO(notificacao.createdAt),
                    new Date(),
                    { addSuffix: true, locale: pt }
                ),
            }));
            setNotificacoes(listaNotificacoes);
        } catch (e) {
            toast.error(
                'Ouve um problema ao inciar as notificações, favor procurar o administrador do sistema'
            );
        }
    };

    useEffect(() => {
        recuperaNotificacoes();
    }, []);

    const temNotificacaoNaoLida = useMemo(
        () => !!notificacoes.find((notificacao) => notificacao.read === false),
        [notificacoes]
    );

    return (
        <Container>
            <Badge
                onClick={() => setVisivel(!visivel)}
                hasUnread={temNotificacaoNaoLida}
            >
                <MdNotifications size={20} color="#1759c1" />
            </Badge>
            <NotificationList visivel={visivel}>
                <Scroll>
                    {notificacoes.map((notificacao) => (
                        <Notification
                            key={notificacao._id}
                            unread={!notificacao.read}
                        >
                            <p>{notificacao.content}</p>
                            <time> {notificacao.timeDistance}</time>
                            {!notificacao.read && (
                                <button
                                    onClick={() =>
                                        marcaNotificacaoComoLida(
                                            notificacao._id
                                        )
                                    }
                                    type="button"
                                >
                                    Marca como lida
                                </button>
                            )}
                        </Notification>
                    ))}
                </Scroll>
            </NotificationList>
        </Container>
    );
}

export default Notifications;
