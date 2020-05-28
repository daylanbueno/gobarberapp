import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import User from '../models/User';
import Appointment from '../models/Appointment';

class ScheduleController {
    async index(req, res) {
        const checkUserProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkUserProvider) {
            return res.status(401).json({ error: 'User  is not provider' });
        }

        const { dataAtual } = req.query;
        console.log('dataAtual**************', dataAtual);
        const parseDate = parseISO(dataAtual);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
                },
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'nome'],
                },
            ],
            order: ['date'],
        });
        return res.json(appointments);
    }
}
export default new ScheduleController();
