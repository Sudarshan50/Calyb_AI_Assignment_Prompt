import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Sudarshan:Sudarshan50@cluster0.hasrdjy.mongodb.net/food_database').then(() => {console.log('Connected to MongoDB')});
}
export default connectDB;