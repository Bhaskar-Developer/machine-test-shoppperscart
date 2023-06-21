const express = require('express');
const router = express.Router();
const CategoryController = require('../controller/categoryController');

router.post('/', CategoryController.create);
router.put('/', CategoryController.updateCategoryById);
router.delete('/', CategoryController.deleteCategoryById);
router.get('/', CategoryController.getCategories);

module.exports = router;
