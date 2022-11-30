const axios = require("axios");
const { redis } = require("../config/redis");

const typeDefs = `#graphql
type User {
    _id: String
    username: String
    email: String
    phoneNumber: String
    address: String
}
`;
