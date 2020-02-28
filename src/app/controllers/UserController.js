import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            nome: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'Validação dos campos falhou' });
        }

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
        const schema = Yup.object().shape({
            nome: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string(),
            password: Yup.string().when('oldPassword', (oldPassword, field) =>
                oldPassword ? field.required() : field
            ),
            confirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res
                .status(400)
                .json({ error: 'A validação dos campos falhou' });
        }

        const user = await User.findByPk(req.userId);
        const { oldPassword, email } = req.body;

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
