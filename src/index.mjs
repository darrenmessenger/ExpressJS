import  express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.cookie('hello', 'world', { maxAge: 600000 * 60 });
    res.status(201).send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});