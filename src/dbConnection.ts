import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('Carsedit', 'postgres', 'root',{
    host: 'localhost',
    dialect: 'postgres'
});


export default sequelize;
