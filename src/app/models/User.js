import Sequelize, { Model } from 'sequelize';
import bcrptjs from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                nome: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            {
                sequelize,
            }
        );
        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrptjs.hash(user.password, 8);
            }
        });
        return this;
    }

    // fazendo relacionamento ==> pertence a
    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id' });
    }

    checkPassword(password) {
        return bcrptjs.compare(password, this.password_hash);
    }
}

export default User;
