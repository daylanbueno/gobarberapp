import * as yup from 'yup';
import Appointment from '../models/Appointment';
import User from '../models/User';

const validateSchema = yup.object().shape({
    provider_id: yup.number().required(),
    date: yup.date().required(),
});

class AppointmentController {
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
                .status(400)
                .json({ error: 'provedor de serviço invalido' });
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
