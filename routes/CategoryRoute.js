const express = require('express');
const { getAllCategory, createCategory, updateCategory, deleteCategory, activeDeactiveCategory } = require('../controllers/categoryControllers');
const { isAuthenticatedAdmin } = require('../middleware/Auth');
const router = express.Router();

router.route("/category")
    .get(getAllCategory);

router.route("/admin/category/new")
    .post(createCategory);

router.route("/admin/category/:id")
    .put(isAuthenticatedAdmin,updateCategory)
    .delete(deleteCategory)

router.route("/admin/controlcategory/:id")
    .post(activeDeactiveCategory);

module.exports = router 