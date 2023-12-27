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
const connected = "not known";


mongoose.connect(`mongodb+srv://maheshbarapatre14:maheshAtlas2023@cluster0.tkhncfb.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  connected = "done"
});

// Define a simple schema and model
const Item = mongoose.model('Item', { name: String });

// Express middleware to parse JSON
app.use(express.json());

// API endpoint to get items from the database
app.get('/api/items', async (req, res) => {
  try{
  const items = await Item.find();
  res.json(items);
  }
  catch{
    res.send("error occured!");
  }
});
app.get('/', async (req, res) => {
  
  res.status(200).send(`server working ${connected}`);
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
