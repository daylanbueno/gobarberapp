import User from '../models/User';
import Notification from '../../schemas/Notification';

class NotificationController {
    async index(req, res) {
        const checkIsProvider = await User.findOne({
            where: { id: req.userId, provider: true },
        });

        if (!checkIsProvider) {
            return res.json({ error: 'User not is provider' });
        }
        const notifications = await Notification.find({
            user: req.userId,
        })
            .sort({ createdAt: 'desc' }) // ordena por esse campo
            .limit(20); // limitar em 20 registro
        return res.json(notifications);
    }

    async update(req, res) {
        const notifications = await Notification.findOneAndUpdate(
            req.params.id,
            { read: true },
            { new: true }
        );
        return res.json(notifications);
    }
}
export default new NotificationController();
