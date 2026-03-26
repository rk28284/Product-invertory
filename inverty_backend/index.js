const express = require('express');
const cors = require('cors');
const inventy = require('./dn.json');

const app = express();
const PORT = 8080;

app.use(cors());

app.get('/search', (req, res) => {
  const { q, category, minPrice, maxPrice } = req.query;

  let results = inventy;
  if (q) {
    results = results.filter(item => 
      item.name.toLowerCase().includes(q.toLowerCase())
    );
  }


  if (category) {
    results = results.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  }


  if (minPrice) {
    results = results.filter(item => item.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    results = results.filter(item => item.price <= parseFloat(maxPrice));
  }

  if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
    return res.status(400).json({ error: "minPrice cannot be greater than maxPrice" });
  }

  res.json(results);
});

app.listen(PORT, async() => {

console.log(" Server Is Connecting...");

try {
    console.log("Connected to Server At Port: ", PORT);

} catch (error) {
    console.error('Error starting server:', error);
}
});