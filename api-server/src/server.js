const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb+srv://dbUserEnrique:Perroloco23@cluster0.ilthrgw.mongodb.net/Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema and model
const productoSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  rating: Number,
  warrantly_years: Number,
  available: Boolean,
});

const Product = mongoose.model('Product', productoSchema);

// URLs CRUD
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.send(products);
});

app.post('/products', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        if(!product) {
            return res.status(404).send({ message: 'Error saving the product'});
        }
        res.send(product);
    }catch(error) {
        res.status(500).send({message: 'Error saving the product'});
    }
    
});

app.get('/products/:id', async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).send({ message: 'Product not found'});
        }
        res.send(product);
    } catch(error) {
        res.status(500).send({message: 'Error getting the product'});
    }
});

app.put('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(product);
});

app.delete('/products/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({ message: 'Product deleted' });
    }catch(error) {
        res.status(500).send({message: 'Error deletting the product'});
    }
    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
