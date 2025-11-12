import app, { port } from './app';
import sequelize from './database/sequelize';
import './models/customer.model';
import './models/book.model';
import './models/cart.model';

const PORT = process.env.PORT || port;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Database connection has been established successfully.');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

startServer();
