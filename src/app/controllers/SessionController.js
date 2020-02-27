import jwt from 'jsonwebtoken';
import User from '../models/User';
import auth from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Usuário não existe' });
        }
        if (!(await user.checkPassword(password))) {
            return res.status(401).json('Senha invalida!');
        }
        const { id, nome } = user;
        return res.json({
            newUser: {
                id,
                nome,
                email,
            },
            token: jwt.sign({ id }, auth.secret, {
                expiresIn: auth.experesIn,
            }),
        });
    }
}

export default new SessionController();
