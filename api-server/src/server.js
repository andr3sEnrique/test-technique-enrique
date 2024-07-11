require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


connectDB();


app.use(bodyParser.json());
app.use(cors());


app.use('/auth', require('./routes/auth'));
app.use('/products', require('./routes/products'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
