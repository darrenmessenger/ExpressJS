import { Router } from "express";

const productsRoutes = Router();

productsRoutes.get('/api/products', (req, res) => {
    console.log(req.cookies);
    res.status(201).send([
        {id: 1, name: 'Laptop', price: 1000},
        {id: 2, name: 'Mobile', price: 500},
        {id: 3, name: 'Tablet', price: 300}
    ]);
});

export default productsRoutes;