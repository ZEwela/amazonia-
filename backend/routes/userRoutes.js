import express, { Router } from "express";
import User from "../models/userModel";
import { getToken } from "../utils";
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';


const router = express.Router();

router.post('/signin', expressAsyncHandler(async(req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                _id: user.id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin, 
                token: getToken(user),
            });
            return
        }
    }
    res.status(401).send({message:'Invalid User or Password'})
})
);

router.post("/register", async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password 
    })
    const newUser = await user.save();
    if (newUser){
        res.send({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        })
    }else {
        res.status(401).send({msg:'Invalid User Data'})
    }
})

export default router;