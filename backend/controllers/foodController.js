import exp from "constants";
import foodModel from "../models/FoodModel.js";
import fs from "fs";


//Add food item
const addFood = async (req, res) => 
{
    let image__filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image__filename,
        category: req.body.category,
    })
    try {
        await food.save();
        res.json({sucess:"True",message:"Food item added successfully"});
    }catch(err){
        res.json({sucess:"False",message: err});   
    }
}

const listFood = async (req, res) => {
    try{
        const food = await foodModel.find();
        res.json({sucess:"True",data:food});
    } catch{
        res.json({sucess:"False",message: err}); 
    }
} 

const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({sucess:"True",message:"Food item removed successfully"});
    } catch(err){
        // res.json({sucess:"False",message: err}); 
        res.json(err);
    }
}

export {addFood,listFood,removeFood};