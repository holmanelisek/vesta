module.exports = {
    "development": {
      "username": process.env.MYSQL_USER,
      "password": process.env.MYSQL_KEY,
      "database": process.env.MYSQL_DBNAME,
      "host": process.env.MYSQL_HOST,
      "dialect": "mysql",
    },
    "test": {
      "username": "root",
      "password": "kitten123",
      "database": "ufo",
      "host": "127.0.0.1",
      "dialect": "mysql",
    },
    "production": {
      "use_env_variable": "JAWSDB_URL",
      "dialect": "mysql",
    }
  }
  