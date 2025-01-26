const { executeQuery } = require("../sql/executeQuery");
const queries = require("../sql/sqlQueries");
const validateFields = require("../validations/pageFieldsValidation");
const xss = require("xss");

class PageService {
  /**
   * Retrieves all pages from the database.
   */
  async getAllPages() {
    try {
      return await executeQuery(queries.getAllPages);
    } catch (error) {
      console.error("Error retrieving pages:", error);
      throw new Error("Failed to retrieve pages");
    }
  }

  /**
   * Retrieves a page by its URL slug.
   * @param {string} urlSlug - The URL slug of the page.
   */
  async getPageBySlug(urlSlug) {
    try {
      const result = await executeQuery(queries.getPageBySlug, [urlSlug]);
      return result.length > 0 ? result[0] : null;
    } catch (error) {
      console.error("Error retrieving page by slug:", error);
      throw new Error("Failed to retrieve page by slug");
    }
  }

  /**
   * Creates a new page in the database.
   * @param {object} pageData - The page details.
   */
  async createPage({ title, metaDescription, content, urlSlug }) {
    try {
      // Validate input fields
      const validationErrors = validateFields(
        title,
        metaDescription,
        content,
        urlSlug,
      );
      if (validationErrors) {
        return { error: "Validation failed", validationErrors };
      }

      // Check if the URL slug is already in use
      const existingSlug = await executeQuery(queries.getPageBySlug, [urlSlug]);
      if (existingSlug.length > 0) {
        return {
          error: "The URL slug is already in use",
          validationErrors: [
            {
              field: "urlSlug",
              message: "The URL slug is already in use",
            },
          ],
        };
      }

      // Sanitize input fields
      title = xss(title);
      metaDescription = xss(metaDescription);
      content = xss(content);
      urlSlug = xss(urlSlug);

      // Insert the new page into the database
      const result = await executeQuery(queries.insertPage, [
        title,
        metaDescription,
        content,
        urlSlug,
      ]);

      return {
        page: {
          id: result.insertId,
          title,
          metaDescription,
          content,
          urlSlug,
        },
      };
    } catch (error) {
      console.error("Error during page creation:", error);
      throw new Error("Failed to create page");
    }
  }

  /**
   * Updates an existing page in the database.
   * @param {number} id - The ID of the page.
   * @param {object} pageData - The updated page details.
   */
  async updatePage(id, { title, metaDescription, content, urlSlug }) {
    try {
      // Validate input fields
      const validationErrors = validateFields(
        title,
        metaDescription,
        content,
        urlSlug,
      );
      if (validationErrors) {
        return { error: "Validation failed", validationErrors };
      }

      // Check if the page with the given ID exists
      const existingPage = await executeQuery(queries.getPageById, [id]);
      if (existingPage.length === 0) {
        return { error: "Page not found", path: "id" };
      }

      // Sanitize input fields
      title = xss(title);
      metaDescription = xss(metaDescription);
      content = xss(content);
      urlSlug = xss(urlSlug);

      // Update the page in the database
      await executeQuery(queries.updatePage, [
        title,
        metaDescription,
        content,
        urlSlug,
        id,
      ]);

      return {
        page: {
          id,
          title,
          metaDescription,
          content,
          urlSlug,
        },
      };
    } catch (error) {
      console.error("Error during page update:", error);
      throw new Error("Failed to update page");
    }
  }

  /**
   * Deletes a page from the database.
   * @param {number} id - The ID of the page to delete.
   */
  async deletePage(id) {
    try {
      // Check if the page with the given ID exists
      const existingPage = await executeQuery(queries.getPageById, [id]);
      if (existingPage.length === 0) {
        return { error: "Page not found", path: "id" };
      }

      // Delete the page from the database
      const result = await executeQuery(queries.deletePage, [id]);
      if (result.affectedRows === 0) {
        return { error: "Failed to delete page" };
      }

      return { message: "Page deleted successfully" };
    } catch (error) {
      console.error("Error during page deletion:", error);
      throw new Error("Failed to delete page");
    }
  }
}

module.exports = new PageService();
