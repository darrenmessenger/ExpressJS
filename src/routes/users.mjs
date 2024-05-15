import { Router } from "express";
import { mockUsers}  from '../utils/constants.mjs';
import { resolveIndexByUserId } from '../utils/middlewares.mjs';
import { User } from "../mongoose/schemas/user.mjs";

const usersRouter = Router();

usersRouter.get('/api/users', (req, res) => {
    console.log(req.query);
    const {
        query: {filter, value},
    } = req;

    if (filter && value) {
        console.log(req.query);
        return res.send(
            mockUsers.filter((user) => {
                // Check if the filter is a valid property and user[filter] is a string
                return user[filter] && typeof user[filter] === 'string' && user[filter].includes(value);
            })
        );
    }
    return res.status(201).send(mockUsers); 
    }
);

usersRouter.get('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    if(findUser) {
        res.status(201).send(findUser);
    } else {
        res.status(404).send('User not found');
    }    
}); 

usersRouter.post('/api/users', async(req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser =  new User(body);
    try {
        const savedUser = await newUser.save();
        return res.status(201).send(savedUser);
    } catch (error) {
        res.status(400
            ).send(error);
    }   
});

usersRouter.put('/api/users/:id', resolveIndexByUserId, (req, res) => {   
    const {body, findUserIndex} = req;
    mockUsers[findUserIndex] = {id: mockUsers[findUserIndex].id, ...body};
    return res.status(201).send(mockUsers[findUserIndex]);

});

usersRouter.patch('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {body, findUserIndex} = req;
    mockUsers[findUserIndex] = {...mockUsers[findUserIndex], ...body};
    return res.status(201).send(mockUsers[findUserIndex]);
});

usersRouter.delete('/api/users/:id', resolveIndexByUserId, (req, res) => {
    const {findUserIndex} = req;
    mockUsers.splice(findUserIndex, 1);
    return res.status(201).send('User deleted');
    
});


export default usersRouter;

