import Sequelize, { Model } from 'sequelize';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
            },
            {
                sequelize,
            }
        );
        return this;
    }

    // fazendo relacionamento
    // quando tem mais de 1 relacionamento com a mesma tabela o apelito é obrigatório
    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        });
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            as: 'provider',
        });
    }
}
export default Appointment;
