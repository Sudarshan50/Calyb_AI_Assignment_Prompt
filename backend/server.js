import e from "express";
import cors from "cors";
import foodRouter from "./routes/foodRoute.js";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";


const app = e();
const port = 4000;

//Middlewares
dotenv.config();
app.use(bodyParser.json());
app.use(cors());
app.use(e.json());



//Database connection
connectDB();

//Api Endpoint
app.use("/api/food", foodRouter);
app.use("/images",e.static('uploads'));
app.use('/list',foodRouter);
app.use('/remove',foodRouter);
app.use('/tour',foodRouter);
app.use('/chat',foodRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//mongodb+srv://Sudarshan:Sudarshan50@cluster0.hasrdjy.mongodb.net/?