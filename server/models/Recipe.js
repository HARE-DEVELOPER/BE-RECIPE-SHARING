const mongoose = require("mongoose");
const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: [{ name: String, quantity: String }],
  steps: [String],
  cookingTime: Number,
  servings: Number,
  photo: String, // Single photo URL for simplicity
  videoUrl: String, // YouTube embed URL
  cuisine: String,
  dietary: [String], // e.g., ["vegan"]
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ratings: [{ user: String, score: Number }],
  comments: [{ user: String, text: String, date: { type: Date, default: Date.now } }],
});
module.exports = mongoose.model("Recipe", recipeSchema);