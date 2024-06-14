import exp from "constants";
import foodModel from "../models/FoodModel.js";
import fs from "fs";

//Add food item
const addFood = async (req, res) => {
  let image__filename = `${req.file.filename}`;
  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: image__filename,
    category: req.body.category,
  });
  try {
    await food.save();
    res.json({ sucess: "True", message: "Food item added successfully" });
  } catch (err) {
    res.json({ sucess: "False", message: err });
  }
};

const listFood = async (req, res) => {
  try {
    const food = await foodModel.find();
    res.json({ sucess: "True", data: food });
  } catch {
    res.json({ sucess: "False", message: err });
  }
};

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ sucess: "True", message: "Food item removed successfully" });
  } catch (err) {
    // res.json({sucess:"False",message: err});
    res.json(err);
  }
};

const giveTour = async (req, res) => {
  const prompt = req.body.prompt;
  if (
    typeof prompt === "string" &&
    (prompt.toLowerCase().includes("tour of main page") ||
      prompt.toLowerCase().includes("tour of this page") ||
      prompt.toLowerCase().includes("buy a meal"))
  ) {
    res.json({ startTour: true });
  } else if (
    (typeof prompt === "string" &&
      prompt.toLowerCase().includes("tour of add page")) ||
    prompt.toLowerCase().includes("how to add meal") ||
    prompt.toLowerCase().includes("add a meal") ||
    prompt.toLowerCase().includes("add food") ||
    prompt.toLowerCase().includes("add food item") ||
    prompt.toLowerCase().includes("add food items")
  ) {
    res.json({ addTour: true });
  } else {
    res.json({ startTour: false });
  }
};
const giveTourAdmin = async (req, res) => {
  const prompt = req.body.prompt;
  if (
    (typeof prompt === "string" &&
      prompt.toLowerCase().includes("tour of add page")) ||
    prompt.toLowerCase().includes("how to add meal") ||
    prompt.toLowerCase().includes("add a meal") ||
    prompt.toLowerCase().includes("add food") ||
    prompt.toLowerCase().includes("add food item") ||
    prompt.toLowerCase().includes("add food items")
  ) {
    res.json({ startTour: true });
  } else if (
    typeof prompt === "string" &&
    (prompt.toLowerCase().includes("tour of main page") ||
      prompt.toLowerCase().includes("tour of this page") ||
      prompt.toLowerCase().includes("buy a meal"))
  ) {
    res.json({ mainTour: true });
  } else {
    res.json({ startTour: false });
  }
};

export { addFood, listFood, removeFood, giveTour, giveTourAdmin };
