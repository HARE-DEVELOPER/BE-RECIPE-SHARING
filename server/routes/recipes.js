const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// Submit recipe
router.post("/submit", async (req, res) => {
  const recipe = new Recipe(req.body);
  await recipe.save();
  res.status(201).json(recipe);
});

// Get all recipes
router.get("/", async (req, res) => {
  const recipes = await Recipe.find().populate("user", "username");
  res.json(recipes);
});

// Search recipes by ingredient
router.get("/search", async (req, res) => {
  const { ingredient, cuisine, dietary } = req.query;
  const query = {};
  if (ingredient) query["ingredients.name"] = new RegExp(ingredient, "i");
  if (cuisine) query.cuisine = cuisine;
  if (dietary) query.dietary = dietary;
  const recipes = await Recipe.find(query).populate("user", "username");
  res.json(recipes);
});

// Rate recipe
router.post("/:id/rate", async (req, res) => {
  const { user, score } = req.body;
  const recipe = await Recipe.findById(req.params.id);
  recipe.ratings.push({ user, score });
  await recipe.save();
  res.json(recipe);
});

// Comment on recipe
router.post("/:id/comment", async (req, res) => {
  const { user, text } = req.body;
  const recipe = await Recipe.findById(req.params.id);
  recipe.comments.push({ user, text });
  await recipe.save();
  res.json(recipe);
});

module.exports = router;