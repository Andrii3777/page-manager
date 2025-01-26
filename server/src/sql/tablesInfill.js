const bcrypt = require("bcrypt");
const queries = require("./sqlQueries");
const env = require("../config");
const { executeQuery, executeSQLFile } = require("./executeQuery");

/**
 * Creates and fills tables in the database.
 * Executes the table creation script followed by
 * the table filling script if the tables are empty.
 */
async function createAndFillTables() {
  try {
    await createTables();
    await fillTables();
  } catch (error) {
    console.error("Error creating and filling tables:", error);
  }
}

/**
 * Executes the script to create tables in the database.
 */
async function createTables() {
  try {
    await executeSQLFile("createTables.sql");
    console.log("Tables created successfully.");
  } catch (error) {
    console.error("Error creating tables:", error);
  }
}

/**
 * Executes the script to fill tables with initial data if the tables are empty.
 */
async function fillTables() {
  try {
    if (await areTablesEmpty()) {
      console.log("Tables are empty, proceeding to fill them.");

      await executeSQLFile("fillTables.sql");
      await createAdmin();

      console.log("Tables filled successfully.");
    } else {
      console.log("Tables are already filled.");
    }
  } catch (error) {
    console.error("Error filling tables:", error);
  }
}

/**
 * Creates an initial admin user in the database.
 * The admin's email and password are retrieved from environment variables.
 * The password is securely hashed before being stored in the database.
 * If the admin already exists, the method ensures no duplicate entry is created.
 */
async function createAdmin() {
  try {
    const adminEmail = env.ADMIN_EMAIL;
    const adminPassword = env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      throw new Error(
        "Admin email or password is missing in environment variables.",
      );
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 8);

    await executeQuery(queries.insertAdmin, [adminEmail, hashedPassword]);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

/**
 * Checks if the tables are empty.
 */
async function areTablesEmpty() {
  try {
    const [{ count: rowsInPageTable }] = await executeQuery(
      queries.checkIfEmptyPageTable,
    );

    return rowsInPageTable === 0;
  } catch (error) {
    console.error("Error checking if tables are empty:", error);
    return false; // Assume tables are not empty if an error occurs
  }
}

module.exports = createAndFillTables;
