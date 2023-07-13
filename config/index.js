import { Sequelize } from 'sequelize';

// Create a Sequelize instance and connect to the database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './bincom_test.sqlite', // Path to the database file
});

  export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
