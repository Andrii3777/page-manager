const pageService = require("../services/pageService.js");

class PageController {
  /**
   * Retrieves all pages.
   */
  async getAllPages(req, res) {
    try {
      const pages = await pageService.getAllPages();
      return res.status(200).json({
        message: "Pages retrieved successfully",
        pages,
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }

  /**
   * Retrieves a page by its URL slug.
   * Returns 404 if the page is not found.
   */
  async getPageBySlug(req, res) {
    try {
      const { urlSlug } = req.params;
      const page = await pageService.getPageBySlug(urlSlug);

      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }

      return res.status(200).json({
        message: "Page retrieved successfully",
        page,
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }

  /**
   * Creates a new page.
   * Returns 400 if validation or creation fails.
   */
  async createPage(req, res) {
    try {
      const { title, metaDescription, content, urlSlug } = req.body;

      const result = await pageService.createPage({
        title,
        metaDescription,
        content,
        urlSlug,
      });

      if (result.error) {
        return res.status(400).json(result);
      }

      return res.status(201).json({
        message: "Page created successfully",
        page: result.page,
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }

  /**
   * Updates an existing page by ID.
   * Returns 400 if validation or update fails.
   */
  async updatePage(req, res) {
    try {
      const { id } = req.params;
      const { title, metaDescription, content, urlSlug } = req.body;

      const result = await pageService.updatePage(id, {
        title,
        metaDescription,
        content,
        urlSlug,
      });

      if (result.error) {
        return res.status(400).json(result);
      }

      return res.status(200).json({
        message: "Page updated successfully",
        page: result.page,
      });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }

  /**
   * Deletes a page by ID.
   * Returns 400 if the deletion fails.
   */
  async deletePage(req, res) {
    try {
      const { id } = req.params;
      const result = await pageService.deletePage(id);

      if (result.error) {
        return res.status(400).json(result);
      }

      return res.status(200).json({ message: "Page deleted successfully" });
    } catch (error) {
      res.status(error?.status || 500).send({ error: error?.message || error });
    }
  }
}

module.exports = new PageController();
