const Redis = require("ioredis");

let redisConfig;

if (process.env.NODE_ENV != "production") {
	redisConfig = {};
} else {
	redisConfig = {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD,
	};
}

const redis = new Redis(redisConfig);

module.exports = redis;
