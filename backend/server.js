import express from 'express';
// import session from 'express-session';
import cors from 'cors';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";
import seedRoutes from "./routes/seedRoutes";
import bodyParser from 'body-parser';
import { cleanBody } from './utils';
const port = process.env.PORT || 5000;

dotenv.config();

mongoose.set("strictQuery", false);
const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log('error mongoose:', error.message));

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(cleanBody);

app.use("/api/seed", seedRoutes );
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message});
 });

app.listen(port, () => {
    console.log('Server started at http://localhost:5000');
})