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
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin, 
                token: getToken(signinUser),
            });
            return
        }
    }
    res.status(401).send({message:'Invalid User or Password'})
})
);
// router.post("/signin", async (req,res) => {
//     const signinUser = await User.findOne({
//         email: req.body.email,
//         password: req.body.password
//     })
//     if (signinUser){
//         res.send({
//             _id: signinUser.id,
//             name: signinUser.name,
//             email: signinUser.email,
//             isAdmin: signinUser.isAdmin,
//             token: getToken(signinUser),
//         })
//     }else {
//         res.status(401).send({msg:'Invalid User or Password'})
//     }
// })

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

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Ewelina',
            email: 'ewelazawol@gmail.com',
            password: '12345678',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    } catch(error){
        res.send({msg: error.message});
    }
})

export default router;