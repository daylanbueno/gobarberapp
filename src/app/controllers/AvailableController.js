import {
    startOfDay,
    endOfDay,
    setMinutes,
    setSeconds,
    setHours,
    format,
    isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';

const schedule = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '22:00',
];

class AvalaibleController {
    async index(req, res) {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ error: 'Invalid date' });
        }

        const searcDate = Number(date);

        const appointments = await Appointment.finddAll({
            where: {
                provider_id: req.params.providerId,
                canceled_at: null,
                date: {
                    [Op.between]: [startOfDay(searcDate), endOfDay(searcDate)],
                },
            },
        });

        const availables = schedule.map(time => {
            const [hour, minute] = time.split(':');
            const value = setSeconds(
                setMinutes(setHours(searcDate, hour), minute),
                0
            );
            return {
                time,
                value: format(value, "yyyy-MM-dd'T'HH:mm:ssxxx"),
                availables:
                    isAfter(value, new Date()) &&
                    !appointments.find(a => format(a.date, 'HH:mm') === time),
            };
        });

        return res.json(availables);
    }
}
export default new AvalaibleController();
