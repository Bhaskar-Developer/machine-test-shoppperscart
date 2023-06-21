const app = require('./app');
const pool = require('./pool');
const dotenv = require('dotenv').config();

(async function () {
  await pool.connect({
    host: process.env.POSTGRE_HOST,
    port: parseInt(process.env.POSTGRE_DB_PORT),
    database: process.env.POSTGRE_DB_NAME,
    user: process.env.POSTGRE_DB_USER,
    password: process.env.POSTGRE_DB_PASSWORD,
  });

  console.log(
    `Successfully connected to database: ${process.env.POSTGRE_DB_NAME}`
  );

  app().listen(
    process.env.PORT,
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on Port ${process.env.PORT}`
    )
  );
})();

//Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err}`);
  process.exit(1);
});
