const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  "development": {
    url: process.env.DBCONNECTION,
    "dialect": "postgres"
  },
  "test":  {
    url: process.env.DBCONNECTION,
    "dialect": "postgres"
  },
  "production":  {
    url: process.env.DBCONNECTION,
    "dialect": "postgres"
  },
}
