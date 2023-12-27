const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: "https://mern-deploy-client.vercel.app",
  method: "GET, POST",
  credentials: true
}
  ));
const PORT = process.env.PORT || 5000;

// Connect to MongoDB (make sure MongoDB is running)
mongoose.connect(`mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.tkhncfb.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple schema and model
const Item = mongoose.model('Item', { name: String });

// Express middleware to parse JSON
app.use(express.json());

// API endpoint to get items from the database
app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});
app.get('/', async (req, res) => {
  
  res.status(200).send("server working");
});

// API endpoint to add an item to the database
app.post('/api/items', async (req, res) => {
  const newItem = new Item({ name: req.body.name });
  await newItem.save();
  res.json(newItem);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
