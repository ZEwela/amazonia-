import express, { Router } from "express";
import Order from "../models/orderModel";
import { isAuth } from "../utils";
import expressAsyncHandler from 'express-async-handler';

const router = express.Router();

router.post('/', isAuth, expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
    });
    const order = await newOrder.save();
    res.status(201).send({message: 'New Order Created', order});
}));

export default router;