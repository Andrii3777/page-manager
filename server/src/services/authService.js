const bcrypt = require("bcrypt");
const { executeQuery } = require("../sql/executeQuery");
const validatePassword = require("../validations/passwordValidation");
const validateEmail = require("../validations/emailValidation");
const tokenService = require("./tokenService");
const queries = require("../sql/sqlQueries");

/**
 * AuthService handles authentication related operations such as signup, login, and logout.
 */
class AuthService {
  /**
   * Registers a new admin by hashing their password and generating JWT tokens.
   * @param {string} email - The email of the admin.
   * @param {string} password - The password of the admin.
   * @returns {Promise<object>} An object containing either error messages or the admin's ID and tokens.
   */
  async createNewAdmin(email, password) {
    try {
      // Check if the email is already in use
      const existingEmails = await executeQuery(queries.getEmail, [email]);
      if (existingEmails.length > 0) {
        return { error: "That email is already in use", path: "email" };
      }

      // Validate email
      const emailValidation = validateEmail(email);
      if (emailValidation) {
        return { error: emailValidation, path: "email" };
      }

      // Validate password
      const passwordValidation = validatePassword(password);
      if (passwordValidation) {
        return { error: passwordValidation, path: "password" };
      }

      const hashedPassword = await bcrypt.hash(password, 8);

      // Insert new admin into the database
      const newAdmin = await executeQuery(queries.insertAdmin, [
        email,
        hashedPassword,
      ]);

      return { adminId: newAdmin.insertId };
    } catch (error) {
      console.error("Error during new admin creation:", error);
      throw new Error("Admin creation failed");
    }
  }

  /**
   * Logs in a admin by verifying their credentials and generating JWT tokens.
   * @param {string} email - The email of the admin.
   * @param {string} password - The password of the admin.
   * @returns {Promise<object>} An object containing either error messages or the admin's ID and tokens.
   */
  async login(email, password) {
    try {
      const results = await executeQuery(queries.getAdminByEmail, [email]);

      if (results.length === 0) {
        return { error: "No such email exists", path: "email" };
      }

      const admin = results[0];

      // Compare the provided password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, admin.password);

      if (!isPasswordMatch) {
        return { error: "Password is incorrect", path: "password" };
      }

      // Generate JWT tokens
      const { accessToken, refreshToken } = tokenService.generateTokens({
        id: admin.id,
        email,
      });

      await tokenService.saveToken(admin.id, refreshToken);

      return { adminId: admin.id, accessToken, refreshToken };
    } catch (error) {
      console.error("Error during login:", error);
      throw new Error("Login failed");
    }
  }

  /**
   * Logs out a admin by deleting their refresh token from the database.
   * @param {string} refreshToken - The refresh token to be deleted.
   * @returns {Promise<boolean>} True if the token was successfully deleted, false otherwise.
   */
  async logout(refreshToken) {
    try {
      const result = await executeQuery(queries.deleteToken, [refreshToken]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error during logout:", error);
      throw new Error("Logout failed");
    }
  }
}

module.exports = new AuthService();
