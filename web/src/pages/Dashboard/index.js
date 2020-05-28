import React, { useState, useMemo } from 'react';

import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

import { Container, Time } from './styles';

function Dashboard() {
    const [dataAtual, setDataAtual] = useState(new Date());

    const dataFormatada = useMemo(
        () => format(dataAtual, "dd 'de' MMMM", { locale: pt }),
        [dataAtual]
    );

    const handleProximoDia = () => {
        setDataAtual(addDays(dataAtual, 1));
    };
    const handleDiaAnterior = () => {
        setDataAtual(subDays(dataAtual, 1));
    };

    return (
        <Container>
            <header>
                <button onClick={() => handleProximoDia()} type="button">
                    <MdChevronLeft size={36} color="#fff" />
                </button>
                <strong>{dataFormatada}</strong>
                <button onClick={() => handleDiaAnterior()} type="button">
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
