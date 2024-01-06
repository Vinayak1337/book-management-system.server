import dotenv from 'dotenv';
dotenv.config();

const config = {
	PORT: process.env.PORT || 8080,
	BASE_URL: process.env.BASE_URL || 'http://localhost:8080',
	ENV: process.env.NODE_ENV || 'development',
	MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/express-mongo',
	JWT_SECRET: process.env.JWT_SECRET || 'secret',
	JWT_EXPIRATION_MS: process.env.JWT_EXPIRATION_MS || '28800000', // 8hrs
	ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || 'http://localhost:4000'
};

export default config;
