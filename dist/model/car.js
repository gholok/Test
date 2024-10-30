"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = __importDefault(require("../dbConnection"));
class Car extends sequelize_1.Model {
}
exports.Car = Car;
Car.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Mark: {
        type: sequelize_1.DataTypes.STRING,
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
        type: sequelize_1.DataTypes.STRING,
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
    sequelize: dbConnection_1.default,
    tableName: "Car"
});
console.log(Car === dbConnection_1.default.models.Car);
