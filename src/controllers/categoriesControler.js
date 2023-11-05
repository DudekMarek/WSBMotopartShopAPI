import Categories from "../models/categoriesModel.js";

async function get(req, res, next) {
  Categories.findAll()
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      console.error(`Error fetching categories: ${err}`);
      res.status(500).json({ error: err });
    });
}

async function create(req, res, nest) {
  const newCategory = req.body;

  if (!newCategory || !newCategory.categoryName) {
    res.status(400).json({ error: "Incomplete or invalid category data" });
  }

  Categories.create(newCategory)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
}

async function remove(req, res, next) {
  const categoryId = req.params.id;

  Categories.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ error: "Customer not found" });
      } else {
        return category.destroy();
      }
    })
    .then(() => {
      res
        .status(200)
        .json({ message: `Customer with Id: ${categoryId} deleted` });
    })
    .catch((err) => {
      console.error(`Error while deleting category: ${err}`);
      res.status(500).json({ error: err });
    });
}

async function update(req, res, next) {
  const categoryId = req.params.id;
  const updatedCategory = req.body;

  Categories.findByPk(categoryId)
    .then((category) => {
      if (!category) {
        res.status(404).json({ error: "Category not found" });
      } else {
        return category.update(updatedCategory);
      }
    })
    .then(() => {
      res
        .status(200)
        .json({ message: `Category with Id: ${categoryId} updated` });
    })
    .catch((err) => {
      console.error(`Error while updating category: ${err}`);
      res.status(500).json({ error: err });
    });
}

export { get, create, remove, update };
