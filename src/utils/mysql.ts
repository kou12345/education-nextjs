import mysql from "mysql2/promise";
import type { Connection } from "mysql2/promise";

let connection: Connection | undefined;

const connectToDatabase = async () => {
  if (!connection) {
    connection = await mysql.createConnection(process.env.DATABASE_URL || "");
    console.log("Connected to the MySQL database.");
  }
  return connection;
};

export default connectToDatabase;