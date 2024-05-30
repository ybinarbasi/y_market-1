const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const stripeRoutes = require('./routes/stripe');

const cors = require('cors')
dotenv.config();





/* 
var conn = MongoClient.connect('mongodb://localhost:5000/') // returns a Promise

app.get('/', function(req, res) {
    conn.then(client=> client.db('test').collection('test').find({}).toArray(function(err, docs) {
        if(err) { console.error(err) }
        res.send(JSON.stringify(docs))
    }))
})
 */



const app = express();

// Parse the body text
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors())
// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/checkout', stripeRoutes);

app.use('/public',express.static('public'))

// Error
app.use((req, res) => {
  res.status(404).json({
    message: 'Error serving the request !'
  });
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    const PORT = process.env.PORT || 5002;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

