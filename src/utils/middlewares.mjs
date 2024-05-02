import {mockUsers} from './constants.mjs';

export const resolveIndexByUserId = (req, res, next) => {
    const {params: {id},} = req;
    const parsedId = parseInt(id);
    if(isNaN(parsedId)) {
        res.status(400).send('Invalid id');
    } 
    const findUserIndex = mockUsers.findIndex(user => user.id === parsedId);
    if(findUserIndex === -1) {
        res.status(404).send('User not found');
    } else {
        req.userIndex = findUserIndex;
        
    }
    req.findUserIndex = findUserIndex;
    next();
};