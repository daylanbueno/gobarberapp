/* eslint-disable no-sparse-arrays */
import React, { useState, useMemo, useEffect } from 'react';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {
    format,
    addDays,
    subDays,
    setHours,
    setMinutes,
    setSeconds,
    isBefore,
    isEqual,
    parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';

import api from '../../services/api';

import { Container, Time } from './styles';

const range = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, , 20];

function Dashboard() {
    const [agendas, setAgendas] = useState([]);
    const [dataAtual, setDataAtual] = useState(new Date());

    useEffect(() => {
        async function carregarAgendamentos() {
            const response = await api.get('schedules', {
                params: { dataAtual },
            });
            const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
            const data = range.map((horas) => {
                const checkDate = setSeconds(
                    setMinutes(setHours(dataAtual, horas), 0),
                    0
                );
                const compareDate = utcToZonedTime(checkDate, timeZone);
                return {
                    time: `${horas}: 00h`,
                    past: isBefore(compareDate, new Date()),
                    appointment: response.data.find((agendamento) =>
                        isEqual(parseISO(agendamento.date), compareDate)
                    ),
                };
            });
            setAgendas(data);
        }
        carregarAgendamentos();
    }, []);

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
                <button onClick={() => handleDiaAnterior()} type="button">
                    <MdChevronLeft size={36} color="#fff" />
                </button>
                <strong>{dataFormatada}</strong>
                <button onClick={() => handleProximoDia()} type="button">
                    <MdChevronRight size={36} color="#fff" />
                </button>
            </header>
            <ul>
                {agendas.map((agenda) => (
                    <Time
                        key={agenda.time}
                        past={agenda.past}
                        available={!agenda.appointment}
                    >
                        <strong>{agenda.time}</strong>
                        <span>
                            {agenda.appointment
                                ? agenda.appointment.user.nome
                                : 'Em Aberto'}
                        </span>
                    </Time>
                ))}
            </ul>
        </Container>
    );
}

export default Dashboard;
