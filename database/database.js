const pg = require('pg');
const {Client}=pg;

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

async function connecteDb() {

  await client.connect();
  console.log('je suis connecte');

}

module.exports ={
  connecteDb,client,
};
