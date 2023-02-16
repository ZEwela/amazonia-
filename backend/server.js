import express from 'express';
// import session from 'express-session';
import data from './data';
import cors from 'cors';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import bodyParser from 'body-parser';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log('error mongoose:', error.message));


const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.listen(port, () => {
    console.log('Server started at http://localhost:5000');
})