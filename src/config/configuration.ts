export default () => ({
  port: parseInt(<string>process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(<string>process.env.DATABASE_PORT, 10) || 27017,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    db: process.env.DATABASE_DB,
  },
});
