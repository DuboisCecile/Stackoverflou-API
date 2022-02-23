require("dotenv").config();

function getEnv(variable) {
  const value = process.env[variable];
  if (typeof value === "undefined") {
    console.warn(`Seems like the variable "${variable}" is not set in the environment. 
    Did you forget to execute "cp .env.sample .env" and adjust variables in the .env file to match your own environment ?`);
  }
  return value;
}

const MONGODB_USER = getEnv(`MONGODB_USER`);
const MONGODB_PASSWORD = getEnv(`MONGODB_PASSWORD`);
const JWT_TOKEN_SECRET = getEnv("JWT_TOKEN_SECRET");

module.exports = {
  getEnv,
  MONGODB_USER,
  MONGODB_PASSWORD,
  JWT_TOKEN_SECRET,
};
