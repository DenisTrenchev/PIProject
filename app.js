const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;
const session = require("express-session");
const flash = require("express-flash");

const passport = require("passport");

const db = require('./models');
const initializePassport = require('./config/passport');

const home = require('./controllers/home');
const login = require('./controllers/login');
const logout = require('./controllers/logout');
const {register, registerFunc} = require('./controllers/register');
const dashboard = require('./controllers/dashboard');
const adminPanel = require('./controllers/adminPanel');
const {createNote, createNoteFunc} = require('./controllers/createNote');
const {editNote, editNoteFunc} = require('./controllers/editNote');
const viewUserNotes = require('./controllers/viewUserNotes');
//------------------------------------------------------------------------------
app.set('view engine', 'ejs');

app.use(session({
	secret: "secret",
	resave: false,
	saveUninitialized: true
}));

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

initializePassport(passport);

app.use(express.urlencoded({extended: false}));
app.use('/public', express.static('public'));
app.use('/home', home);
app.use('/', home);
app.use('/users/login', login);
app.use('/users/logout', logout);
app.use('/users/register', register);
app.use('/users/dashboard', dashboard);
app.use('/users/adminPanel', adminPanel);
app.use('/users/dashboard/createNote', createNote);
app.use('/users/dashboard/editNote', editNote);
app.use('/users/adminPanel/userNotes', viewUserNotes);

//DB test
db.sequelize.authenticate()
	.then(() => console.log('Database connected...'))
	.catch(err => console.log('Error: ' + err))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));