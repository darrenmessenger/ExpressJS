import  express from 'express';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
import '../src/strategies/local-strategy.mjs';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());
app.use(cookieParser('helloworld'));
app.use(session({
    secret: 'Anson the developer',
    saveUninitialized: false,
    resave: false,
    cookie: { maxAge: 60000 * 60 }
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://localhost:27017/express')
    .then(() => {
        console.log('Connected to express database');
    })
    .catch((err) => {
        console.log(err);
    });


app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret : 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 * 60, secure: false }   
}));
app.use(routes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie('hello', 'world', { maxAge: 600000 * 60 });
    res.status(201).send('Hello World');
});

app.post('/api/auth', passport.authenticate("local"), (req, res) => {
    console.log('Authenticated', req.user);
    res.sendStatus(200);
});

app.get('/api/auth/status', (req, res) => {
    console.log('Authenticated', req.isAuthenticated());
    return req.isAuthenticated() ? res.status(200).send(req.user) : res.status(401).send('Not Authenticated');
});

app.post('/api/auth/logout', (req,res) => {
    if(!req.user) return res.sendStatus(401);
    req.logout((err) => {
        if (err) return res.sendStatus(400);
        res.sendStatus(200);
    });

});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});