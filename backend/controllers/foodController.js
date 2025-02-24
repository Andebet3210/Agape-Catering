import foodModel from '../models/foodModel.js';
import fs from 'fs';

// Add Food
const addFood = async (req, res) => {
  try {
    const image_filename = req.file?.filename;

    if (!image_filename) {
      return res
        .status(400)
        .json({ success: false, message: 'Image upload failed' });
    }

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: 'Food Added', data: food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error adding food' });
  }
};

// List Food
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Error fetching food list' });
  }
};

// Remove Food
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    if (food) {
      fs.unlink(`uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: 'Food Removed' });
    } else {
      res.status(404).json({ success: false, message: 'Food not found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Error removing food' });
  }
};

export { addFood, listFood, removeFood };
