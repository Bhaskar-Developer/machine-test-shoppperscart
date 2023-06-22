const asyncHandler = require('../middlewares/async');
const CategoryRepo = require('../repos/categoryRepo');
const errorResponse = require('../utils/errorResponse');

class CategoryController {
  //@desc     Create New Category
  //@route    POST /api/v1/category
  //@access   Public
  create = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    // move this into validator middleware later
    if (!name) {
      return next(new errorResponse('Please specify name for category', 400));
    }

    await CategoryRepo.create(name);

    res.status(200).json({
      status: true,
      code: 200,
      message: 'New category was successfully created',
    });
  });

  //@desc     Get All Categories
  //@route    GET /api/v1/category
  //@access   Public
  getCategories = asyncHandler(async (req, res, next) => {
    const categories = await CategoryRepo.find();
    res.status(200).json({
      status: true,
      code: 200,
      categories,
      message: 'New category was successfully created',
    });
  });

  //@desc     Get Single Category
  //@route    GET /api/v1/category/:id
  //@access   Public
  getCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (!id) {
      return next(new errorResponse('Please specify id', 400));
    }
    const category = await CategoryRepo.findById(Number(id));
    res.status(200).json({
      status: true,
      code: 200,
      category,
      message: 'Category was successfully fetched',
    });
  });

  //@desc     Update A Category
  //@route    PUT /api/v1/category
  //@access   Public
  updateCategoryById = asyncHandler(async (req, res, next) => {
    const { name, id } = req.body;

    // move this into validator middleware later
    if (!name || !id) {
      return next(
        new errorResponse(
          'Please specify required details to update category',
          400
        )
      );
    }

    const updates = {
      name,
    };

    await CategoryRepo.findByIdAndUpdate(id, updates);

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Category was successfully updated',
    });
  });

  //@desc     Delete Category By Id
  //@route    DELETE /api/v1/category?id
  //@access   Public
  deleteCategoryById = asyncHandler(async (req, res, next) => {
    const { id } = req.query;

    await CategoryRepo.findByIdAndDelete(Number(id));

    res.status(200).json({
      status: true,
      code: 200,
      message: 'Category was successfully deleted',
    });
  });
}

module.exports = new CategoryController();
