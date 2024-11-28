const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());


const uri = 'mongodb+srv://coms3190:KtCbNpJx1ifdcqdJ@homepage.nvrtc.mongodb.net/?retryWrites=true&w=majority&appName=homepage';
const client = new MongoClient(uri);

async function testConnection() {
  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Ping the admin database to verify the connection
    await client.db('admin').command({ ping: 1 });
    console.log('✅ MongoDB connection successful!');
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

testConnection();
