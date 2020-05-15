const { Router } = require("express");
const Recipe = require("./recipe-model");

const router = Router();

router.get("/recipes", async (req, res, next) => {
  try {
    const recipes = await Recipe.getRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
});
router.get("/recipes/:id", validateRecipeId, async (req, res, next) => {
  try {
    res.json(req.recipe);
  } catch (error) {
    next(error);
  }
});
router.get(
  "/recipes/:id/shoppingList",
  validateRecipeId,
  async (req, res, next) => {
    try {
      const ingredients = await Recipe.getShoppingList(req.params.id);
      res.json(ingredients);
    } catch (error) {
      next(error);
    }
  }
);
router.get(
  "/recipes/:id/instructions",
  validateRecipeId,
  async (req, res, next) => {
    try {
      const instructions = await Recipe.getInstructions(req.params.id);
      res.json(instructions);
    } catch (error) {
      next(error);
    }
  }
);

async function validateRecipeId(req, res, next) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        message: "Should not found the recipe with the specified ID.",
      });
    }
    req.recipe = recipe;
    next();
  } catch (error) {
    res.status(500).json({ message: "An error occurred." });
  }
}

module.exports = router;
