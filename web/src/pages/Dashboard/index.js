import React from 'react';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

function Dashboard() {
    return (
        <Container>
            <header>
                <button type="button">
                    <MdChevronLeft size={36} color="#fff" />
                </button>
                <strong>26 de maio </strong>
                <button type="button">
                    <MdChevronRight size={36} color="#fff" />
                </button>
            </header>
            <ul>
                <Time past>
                    <strong>08:00</strong>
                    <span>Amanda Cristina</span>
                </Time>
                <Time available>
                    <strong>09:00</strong>
                    <span>Em aberto</span>
                </Time>
                <Time>
                    <strong>10:00</strong>
                    <span>Eduardo Silva</span>
                </Time>
                <Time available>
                    <strong>11:00</strong>
                    <span>Em aberto</span>
                </Time>
            </ul>
        </Container>
    );
}

export default Dashboard;
