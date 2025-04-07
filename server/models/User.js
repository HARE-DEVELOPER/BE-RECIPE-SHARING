const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Simplified: no hashing for now
  bio: String,
  recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipe" }],
});
module.exports = mongoose.model("User", userSchema);