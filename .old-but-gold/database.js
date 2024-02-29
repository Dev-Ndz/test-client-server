const mariadb = require("mariadb");
require('dotenv').config();
class Database{
    static async query(query) {
        const conn = await mariadb.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME
        });
        try {
            const res = await conn.query(query);
            return res;
        } finally {
            conn.end();
        }
    }
}
module.exports = Database;