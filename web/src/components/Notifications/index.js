import React, { useState } from 'react';

import { MdNotifications } from 'react-icons/md';

import {
    Container,
    Badge,
    NotificationList,
    Notification,
    Scroll,
} from './styles';

function Notifications() {
    const [visivel, setVisivel] = useState(false);
    return (
        <Container>
            <Badge onClick={() => setVisivel(!visivel)} hasUnread>
                <MdNotifications size={20} color="#1759c1" />
            </Badge>
            <NotificationList visivel={visivel}>
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
