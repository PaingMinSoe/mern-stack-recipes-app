const Recipe = require("../models/Recipe");
const mongoose = require("mongoose");

const RecipeController = {
    index: async (req, res) => {
        const recipes = await Recipe.find().sort({createdAt: -1});
        return res.json(recipes);
    },
    store: async (req, res) => {
        try {
            const { title, description, ingredients } = req.body;
            
            const recipe = await Recipe.create({
                title, 
                description,
                ingredients
            });

            return res.json(recipe);
        } catch (e) {
            return res.status(400).json({ msg: "Invalid Fields"});
        }
    },
    show: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid ID" });
            }
            const recipe = await Recipe.findById(id);

            if (!recipe) {
                return res.status(404).json({ msg: "Recipe not found." });
            }

            return res.json(recipe);
        } catch (e) {
            return res.status(500).json({ msg: "Server Error." });
        }
    },
    destroy: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid ID" });
            }
            const recipe = await Recipe.findByIdAndDelete(id);

            if (!recipe) {
                return res.status(404).json({ msg: "Recipe not found." });
            }

            return res.json(recipe);
        } catch (e) {
            return res.status(500).json({ msg: "Server Error." });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: "Not a valid ID" });
            }
            const recipe = await Recipe.findByIdAndUpdate(id, {
                ...req.body
            });

            if (!recipe) {
                return res.status(404).json({ msg: "Recipe not found." });
            }

            return res.json(recipe);
        } catch (e) {
            return res.status(500).json({ msg: "Server Error." });
        }
    }
}

module.exports = RecipeController;