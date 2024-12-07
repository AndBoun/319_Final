const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const path = require('path');

const app = express();
app.use(cors());

const uri = 'mongodb+srv://coms3190:KtCbNpJx1ifdcqdJ@homepage.nvrtc.mongodb.net/?retryWrites=true&w=majority&appName=homepage';

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect(); // Connect to MongoDB
    console.log("Successfully connected to MongoDB!");

    const db = client.db('products'); // Database name
    const collection = db.collection('homepage'); // Collection name
    const outerwearCollection = db.collection('Outerwear');
    // Endpoint to fetch homepage data
    app.get('/homepage-data', async (req, res) => {
      try {
        const data = await collection.findOne({});
        if (!data) {
          res.status(404).json({ error: 'No data found in the homepage collection.' });
          return;
        }
        res.json(data);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
        res.status(500).json({ error: 'Failed to fetch homepage data.' });
      }
    });

    app.get('/outerwear-data', async (req, res) => {
      try {
        const data = await outerwearCollection.find({}).toArray();
        if (!data || data.length === 0) {
          res.status(404).json({ error: 'No data found in the outerwear collection.' });
          return;
        }
        res.json(data);
      } catch (error) {
        console.error('Error fetching outerwear data:', error);
        res.status(500).json({ error: 'Failed to fetch outerwear data.' });
      }
    });

    app.listen(8080, () => {
      console.log('Backend server is running on http://localhost:8080');
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);