const connectDB = require('./db/DbConnect');
const express = require('express');
const cors = require('cors');
const upload = require('./multer/fileUpload');
const { AddProductsData } = require('./api/AddProductsApi');
const { AddContactUsData } = require('./api/ContactUsApi');
const { CheckLoginActivity } = require('./api/LoginApi');
const { AddSignUpData } = require('./api/SignUpApi');
const { ShowProductsData } = require('./api/ShowProductsApi');
const path = require('path');
const { DeleteProduct, UpdateProduct } = require('./api/ManagerProductApi');
const session = require('express-session');
const { Logout } = require('./api/LogOut');
const Session = require('./api/checkSession');
require('dotenv').config();



connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}))

const PORT = 8000;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST']
}));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/addProduct', upload.single("image"), AddProductsData);
app.post('/contactUs', AddContactUsData);
app.post('/login', CheckLoginActivity);
app.post('/signUp', AddSignUpData);
app.get('/products', ShowProductsData);
app.post('/deleteProduct', DeleteProduct);
app.post('/updateProduct', upload.single('image'), UpdateProduct);
app.post('/logout', Logout);
app.get('/session', Session);


app.listen(PORT, ()=>{
    console.log("Server started on port", PORT);
});