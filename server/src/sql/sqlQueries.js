const env = require("../config");

const queries = {
  createDatabase: `CREATE DATABASE IF NOT EXISTS \`${env.MYSQL_DATABASE}\`;`,
  getEmail: "SELECT email FROM admin WHERE email = ?",
  getAdminByEmail: "SELECT * FROM admin WHERE email = ?",
  getAdminById: "SELECT * FROM admin WHERE id = ?",
  getTokenByAdminId: "SELECT * FROM refreshToken WHERE adminId = ?",
  updateTokenByAdminId: "UPDATE refreshToken SET token = ? WHERE adminId = ?",
  insertToken: "INSERT INTO refreshToken (token, adminId) VALUES (?, ?)",
  deleteToken: "DELETE FROM refreshToken WHERE token = ?",
  getToken: "SELECT * FROM refreshToken WHERE token = ?",
  insertAdmin: "INSERT INTO admin (email, password) VALUES (?, ?)",
  checkIfEmptyPageTable: "SELECT COUNT(*) AS count FROM page",
  getPageBySlug: "SELECT * FROM page WHERE urlSlug = ?",
  insertPage:
    "INSERT INTO page (title, metaDescription, content, urlSlug) VALUES (?, ?, ?, ?)",
  getPageById: "SELECT * FROM page WHERE id = ?",
  updatePage:
    "UPDATE page SET title = ?, metaDescription = ?, content = ?, urlSlug = ? WHERE id = ?",
  deletePage: "DELETE FROM page WHERE id = ?",
  getAllPages: "SELECT * FROM page",
};

module.exports = queries;
