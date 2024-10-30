import {Model, DataTypes} from 'sequelize';
import sequelize from '../dbConnection';
export class Car extends Model {
    public id!: number;
    public id_Car!: number;
    public Mark!: string;
    public Model!: string;
}
Car.init({
    id: {
        type: DataTypes.INTEGER,

        autoIncrement: true,

    },
    id_Car: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        validate: {
            isInt: {
                msg: "id_Car must be an integer",
            },
            min: {
                args: [0],
                msg: "id_Car must be at least 0",
            },
        },
    },
    Mark: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Mark cannot be empty",
            },
            len: {
                args: [1, 128],
                msg: "Mark must be between 1 and 128 characters",
            },
        },
    },
    Model: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Model cannot be empty",
            },
            len: {
                args: [1, 128],
                msg: "Model must be between 1 and 128 characters",
            },
        },
    }
}, {
    sequelize,
    tableName: "Car"
});
console.log(Car === sequelize.models.Car)

