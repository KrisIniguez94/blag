// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/blag"
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    }
  }
};
