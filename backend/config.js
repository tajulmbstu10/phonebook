import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/phonebook',
    JWT_SECRETE: process.env.JWT_SECRETE || 'mysecretekey',
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || "5000",
}