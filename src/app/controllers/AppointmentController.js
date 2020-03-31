import * as yup from 'yup';
import { format, startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Notification from '../../schemas/Notification';
import Mail from '../../lib/Mail';

const validateSchema = yup.object().shape({
    provider_id: yup.number().required(),
    date: yup.date().required(),
});

class AppointmentController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const appointments = await Appointment.findAll({
            where: { user_id: req.userId, canceled_at: null },
            order: ['date'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['id', 'nome'],
                    include: [
                        {
                            model: File,
                            as: 'avatar',
                            attributes: ['id', 'path', 'url'],
                        },
                    ],
                },
            ],
        });
        return res.json(appointments);
    }

    async store(req, res) {
        if (!(await validateSchema.isValid(req.body))) {
            return res.status(400).json({ error: ' campos obrigatório' });
        }
        const { provider_id, date } = req.body;

        const isProviderValido = await User.findOne({
            where: { id: provider_id, provider: true },
        });

        if (!isProviderValido) {
            return res
                .status(401)
                .json({ error: 'provedor de serviço invalido' });
        }

        // verificar se é data do passado
        const hourStart = startOfHour(parseISO(date));
        if (isBefore(hourStart, new Date())) {
            return res
                .status(400)
                .json({ error: 'Data no passado não é permitido' });
        }

        const checkHorarioIndisponivel = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart,
            },
        });

        if (checkHorarioIndisponivel) {
            return res.status(400).json({ error: 'Horário indisponivel' });
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        const user = await User.findByPk(req.userId);
        const formatedDate = format(
            hourStart,
            "'dia' dd  'de' MMMM, 'às' H:mm'h' ",
            { locale: pt }
        );
        await Notification.create({
            content: `Novo agendamento  ${user.nome} ${formatedDate} `,
            user: provider_id,
        });

        return res.json(appointment);
    }

    async delete(req, res) {
        const appointment = await Appointment.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    as: 'provider',
                    attributes: ['nome', 'email'],
                },
                {
                    model: User,
                    as: 'user',
                    attributes: ['nome'],
                },
            ],
        });
        if (!appointment || appointment === null) {
            return res.status(204).json();
        }

        if (appointment.user_id !== req.userId) {
            return res.status(401).json({
                error: 'Você não tem permissão para excluir esse agendamento',
            });
        }

        const dateWithSub = subHours(appointment.date, 2);
        if (isBefore(dateWithSub, new Date())) {
            return res.status(401).json({
                error:
                    'Você não pode cancelar esse agendamento com menos de 2 horas de antecedencia.',
            });
        }
        appointment.canceled_at = new Date();
        await appointment.save();
        await Mail.sendMail({
            to: `${appointment.provider.nome} <${appointment.provider.email}> `,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.nome,
                user: appointment.user.nome,
                date: format(
                    appointment.date,
                    "'dia' dd  'de' MMMM, 'às' H:mm'h' ",
                    {
                        locale: pt,
                    }
                ),
            },
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
