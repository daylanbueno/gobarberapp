import React from 'react';

import { MdNotifications } from 'react-icons/md';

import {
    Container,
    Badge,
    NotificationList,
    Notification,
    Scroll,
} from './styles';

function Notifications() {
    return (
        <Container>
            <Badge hasUnread>
                <MdNotifications size={20} color="#1759c1" />
            </Badge>
            <NotificationList>
                <Scroll>
                    <Notification unread>
                        <p>Você tem um novo agendamento</p>
                        <time> a dois dias</time>
                        <button type="button">Marca como lida</button>
                    </Notification>

                    <Notification>
                        <p>Você tem um novo agendamento</p>
                        <time> a dois dias</time>
                        <button type="button">Marca como lida</button>
                    </Notification>

                    <Notification>
                        <p>Você tem um novo agendamento</p>
                        <time> a dois dias</time>
                        <button type="button">Marca como lida</button>
                    </Notification>

                    <Notification>
                        <p>Você tem um novo agendamento</p>
                        <time> a dois dias</time>
                        <button type="button">Marca como lida</button>
                    </Notification>

                    <Notification>
                        <p>Você tem um novo agendamento</p>
                        <time> a dois dias</time>
                        <button type="button">Marca como lida</button>
                    </Notification>

                    <Notification>
                        <p>Você tem um novo agendamento</p>
                        <time> a dois dias</time>
                        <button type="button">Marca como lida</button>
                    </Notification>
                </Scroll>
            </NotificationList>
        </Container>
    );
}

export default Notifications;
