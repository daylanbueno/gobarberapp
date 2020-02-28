import User from '../models/User';

class UserController {
    async store(req, res) {
        const userExists = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExists) {
            res.status(400).json({ error: 'Usuário já cadastrado' });
        }

        const { id, nome, email, provider } = await User.create(req.body);
        return res.json({ id, nome, email, provider });
    }

    async update(req, res) {
        const { oldPassword, email } = req.body;

        const user = await User.findByPk(req.userId);

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });
            if (!userExists) {
                return res.status(400).json({ error: 'Usuário não existe' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json('Senha invalida');
        }

        const { id, nome, provider } = await user.update(req.body);
        return res.json({ id, nome, email, provider });
    }
}

export default new UserController();
