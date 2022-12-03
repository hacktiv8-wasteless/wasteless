const axios = require("axios");
const baseURL = process.env.APP_SERVICES_URL || "http://localhost:4001";

const instance = axios.create({
	baseURL,
});

module.export = instance;