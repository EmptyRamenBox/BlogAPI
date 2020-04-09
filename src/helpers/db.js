// db.js
//  ./src/helpers/db.js
// Handles Database communications
import knex from "knex";

// This will handle connection string of database
const db = knex({
  client: process.env.DB_TYPE,
  connection: {
    filename: process.env.DB_FILE,
  },
  useNullAsDefault: true,
});

// Posts Table
// User Table
// ...
// Runs on promises
// Loads data whenever needed
const createTables = async () => {
  !(await db.schema.hasTable("posts"))
    ? await db.schema.createTable("posts", (table) => {
        table.increments().primary();
        table.string("title");
        table.string("text");
        table.string("author");
        table.timestamp("created").defaultTo(new Date().toLocaleString());
        table.timestamp("updated").defaultTo(new Date().toLocaleString());
      })
    : null;
  !(await db.schema.hasTable("users"))
    ? await db.schema.createTable("users", (table) => {
        table.increments().primary();
        table.string("uuid");
        table.string("name");
        table.string("email");
        table.timestamp("picture");
        table.timestamp("created").defaultTo(new Date().toLocaleString());
        table.timestamp("lastAccess").defaultTo(new Date().toLocaleString());
      })
    : null;
};

createTables();

export default db;
