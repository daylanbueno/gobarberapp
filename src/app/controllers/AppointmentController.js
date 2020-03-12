import * as yup from 'yup';
import {  startOfHour, parseISO, isBefore } from 'date-fns'
import Appointment from '../models/Appointment';
import User from '../models/User';
import File  from '../models/File'

const validateSchema = yup.object().shape({
    provider_id: yup.number().required(),
    date: yup.date().required(),
});

class AppointmentController {

    async index(req, res) {
        const { page } = req.query
        const appointments  = await Appointment.findAll({
            where: {  user_id: req.userId, canceled_at: null },
            order:['date'],
            attributes: ['id', 'date'],
            limit: 20,
            offset: (page - 1) * 20,
            include: [
                {
                    model: User, as: 'provider', attributes: ['id', 'nome'],
                    include: [
                        {
                            model: File, as: 'avatar', attributes: ['id', 'path', 'url']
                        }
                    ]
                }
              
            ]
        })
        return res.json(appointments)
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
        const hourStart = startOfHour(parseISO(date))
        if(isBefore(hourStart, new Date())) {
            return res.status(400).json({ error: 'Data no passado não é permitido' })
        }

        const checkHorarioIndisponivel  = await Appointment.findOne({
            where: {
                provider_id,
                canceled_at: null,
                date: hourStart
            }
        })
        
        if(checkHorarioIndisponivel) {
            return res.status(400).json({ error: 'Horário indisponivel' })
        }

        const appointment = await Appointment.create({
            user_id: req.userId,
            provider_id,
            date,
        });

        return res.json(appointment);
    }
}

export default new AppointmentController();
