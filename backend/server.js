import express from 'express';
// import session from 'express-session';
import data from './data';
import cors from 'cors';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from "./routes/userRoute"

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).catch(error => console.log('error mongoose:', error.message));


const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.use("/api/users", userRoute);

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({msg: "Product Not Found"});
    }    
});

app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.listen(port, () => {
    console.log('Server started at http://localhost:5000');
})