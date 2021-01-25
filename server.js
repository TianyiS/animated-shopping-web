const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const path = require("path");
// const { createProxyMiddleware } = require('http-proxy-middleware');


const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.sendFile(__dirname + "/build/index.html"));

// app.use('/api/products', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
// app.use('/api/products/:id', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
// app.use('/api/orders', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));
// app.use('/api/orders/:id', createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true }));


// mongoose.connect("mongodb://localhost/awesome-shopping-web-db",{
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
// })

const url = `mongodb+srv://Ethan:19920713@cluster0.na66d.mongodb.net/default?retryWrites=true&w=majority`
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url, connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const Product = mongoose.model(
    "products",
    new mongoose.Schema({
      _id: { type: String, default: shortid.generate },
      title: String,
      description: String,
      image: String,
      price: Number,
      availableSizes: [String],
    })
  );

app.get("/api/products", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
})

app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
})

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

const Order = mongoose.model(
    "order",
    new mongoose.Schema({
        _id: {type: String, default: shortid.generate},
        email: String,
        name: String,
        address: String,
        total: Number,
        cartItems: [{
            _id: String,
            title: String,
            price: Number,
            count: Number
        }],
    }, {timestamps: true})
);

app.post('/api/orders', async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.address || 
        !req.body.total || !req.body.cartItems) {
            return res.send({message : 'Data is required'})
        }
        const order = await Order(req.body).save();
        res.send(order);
}),

app.get('/api/orders', async (req, res) => {
    const orders = await Order.find({});
    res.send(orders);
})

app.delete('/api/orders/:id', async (req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    res.send(deletedOrder);
})

app.listen(port, () => console.log("serve at http://localhost:5000"));