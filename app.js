const express = require('express');
const app = express();
const port = 3000;
//ROUTES
const orders = require('./routes/orders');
const cart = require('./routes/cart');
const users = require('./routes/users');
const products = require('./routes/products');
app.use('/api/orders', orders);
app.use('/api/cart', cart);
app.use('/api/users', users);
app.use('/api/products', products);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})