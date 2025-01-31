const { Router } = require("express");
const authController = require("../controllers/authController");
const pageController = require("../controllers/pageController");
const { requireAuth } = require("../middlewares/authMiddleware");

const router = Router();

// Authentication routes
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.post("/admin/create", requireAuth, authController.createNewAdmin);

// Page management routes (protected)
router.post("/admin/pages", requireAuth, pageController.createPage);
router.put("/admin/pages/:id", requireAuth, pageController.updatePage);
router.delete("/admin/pages/:id", requireAuth, pageController.deletePage);

// Public route to retrieve pages
router.get("/pages", pageController.getAllPages);
router.get("/pages/:urlSlug", pageController.getPageBySlug);

module.exports = router;
