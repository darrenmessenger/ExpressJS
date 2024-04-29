import  express from 'express';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [ 
    {id: 1, username: "John", displayName: "John"},
    {id: 2, username: "Jane", displayName: "Jane"},
    {id: 3, username: "Doe", displayName: "Doe"},
    {id: 4, username: "Smith", displayName: "Smith"},
    {id: 5, username: "Alex", displayName: "Alex"},
    {id: 6, username: "Alice", displayName: "Alice"},
    {id: 7, username: "Bob", displayName: "Bob"}    
];


app.get('/', (req, res) => {
    res.status(201).send('Hello World');
});

app.get('/api/users', (req, res) => {   
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
});

app.post('/api/users', (req, res) => {
    console.log(req.body);
    const { body } = req;
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
    mockUsers.push(newUser);
    res.status(201).send(newUser);
});


app.get('/api/users/:id', (req, res) => {
    const parsedId = parseInt(req.params.id);
    if(isNaN(parsedId)) {
        res.status(400).send('Invalid id');
    } else {
        const user = mockUsers.find(u => u.id === parsedId);
        if(user) {
            res.status(201).send(user);
        } else {
            res.status(404).send('User not found');
        }
    }   
    
}); 

app.get('/api/products', (req, res) => {
    res.status(201).send([
        {id: 1, name: 'Laptop', price: 1000},
        {id: 2, name: 'Mobile', price: 500},
        {id: 3, name: 'Tablet', price: 300}
    ]);
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});