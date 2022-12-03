const axios = require("axios");
const baseURL = process.env.USERS_SERVICES_URL || "http://localhost:4002";

const instance = axios.create({
	baseURL,
});

module.export = instance;