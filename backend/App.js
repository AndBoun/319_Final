const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const path = require("path");
const bcrypt = require("bcrypt");
const fs = require("fs"); // Add this at the top
var multer = require("multer");
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://coms3190:KtCbNpJx1ifdcqdJ@homepage.nvrtc.mongodb.net/?retryWrites=true&w=majority&appName=homepage";

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve images from the images directory
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(
  "/myotherimages",
  express.static(path.join(__dirname, "myotherimages"))
);

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/"); // Save images in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage: storage });
// Create "uploads" folder if it doesn't exist
if (!fs.existsSync("images")) {
  fs.mkdirSync("images");
}




const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect(); // Connect to MongoDB
    console.log("Successfully connected to MongoDB!");

    const db = client.db("products"); // Database name
    const usersDb = client.db("Users"); // Database name

    app.post('/register', async (req, res) => {
      try {
        const { email, password } = req.body;
        const collection = usersDb.collection("users");
    
        // Check if the email is already used
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already used' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const result = await collection.insertOne({
          email,
          password: hashedPassword,
        });
    
        res.status(201).json({
          message: 'User registered successfully',
          userId: result.insertedId,
        });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to register user' });
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;

        if (email === "admin" && password === "admin") {
          const token = jwt.sign(
            { email: "admin", role: "admin" },
            "secret_key",
            { expiresIn: "1h" }
          );
          return res.json({ message: "Login successful", token });
        }

        const collection = usersDb.collection("users");
        const user = await collection.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { email: user.email, _id: user._id },
            "secret_key",
            { expiresIn: "1h" }
          );
          res.json({ message: "Login successful", token });
        } else {
          res.status(401).send("Invalid email or password");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Failed to login" });
      }
    });

    app.get("/homepage-data", async (req, res) => {
      try {
        const collection = db.collection("homepage");
        const data = await collection.findOne({});
        if (!data) {
          res
            .status(404)
            .json({ error: "No data found in the homepage collection." });
          return;
        }
        res.json(data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
        res.status(500).json({ error: "Failed to fetch homepage data." });
      }
    });

    app.put("/forgot-password", async (req, res) => {
      try {
        const { email, newPassword } = req.body;
        const collection = usersDb.collection("users");
        const user = await collection.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10); // Hash the new password
        await collection.updateOne(
          { email },
          { $set: { password: hashedPassword } }
        );
        res.status(200).json({ message: "Password reset successful" });
      } catch (error) {
        console.error("Error resetting password:", error);
        res.status(500).json({ error: "Failed to reset password" });
      }
    });

    const authenticateUser = (req, res, next) => {
      // Example: Check for a token in the request headers
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" format
      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      // Verify the token and attach user information to req.user
      jwt.verify(token, "secret_key", (err, user) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = user;
        next();
      });
    };

    app.get("/account", authenticateUser, async (req, res) => {
      try {
        const user = req.user;
        if (!user) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const accountInfo = { email: user.email };
        const orders = await usersDb
          .collection("Orders")
          .find({ "shippingInfo.email": user.email })
          .toArray();

        res.status(200).json({ accountInfo, orders });
      } catch (error) {
        console.error("Error fetching account data:", error);
        res.status(500).json({ error: "Failed to fetch account data" });
      }
    });

    app.get("/outerwear-data", async (req, res) => {
      try {
        const collection = db.collection("Outerwear");
        console.log("Fetching data from 'Outerwear' collection"); // Debugging log
        const data = await collection.find({}).toArray();
        console.log("Fetched data:", data); // Debugging log
        if (!data || data.length === 0) {
          res
            .status(404)
            .json({ error: "No data found in the outerwear collection." });
          return;
        }
        res.json(data);
      } catch (error) {
        console.error("Error fetching outerwear data:", error);
        res.status(500).json({ error: "Failed to fetch outerwear data." });
      }
    });

    

    app.get("/pants-data", async (req, res) => {
      try {
        const collection = db.collection("Pants");
        console.log("Fetching data from 'Pants' collection"); // Debugging log
        const data = await collection.find({}).toArray();
        console.log("Fetched data:", data); // Debugging log
        if (!data || data.length === 0) {
          res
            .status(404)
            .json({ error: "No data found in the pants collection." });
          return;
        }
        res.json(data);
      } catch (error) {
        console.error("Error fetching pants data:", error);
        res.status(500).json({ error: "Failed to fetch pants data." });
      }
    });

    app.post('/add-outerwear', upload.single('image'), async (req, res) => {
      try {
        const { item, productDescription, price, attribute } = req.body;
        const image = req.file;
    
        console.log('Received data for adding outerwear:', { item, productDescription, price, image, attribute });
    
        if (!item || !productDescription || !price || !image || !attribute) {
          console.log('Validation failed: Missing fields');
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const collection = db.collection('Outerwear');
        const result = await collection.updateOne(
          { mainTitle: 'Outerwear' },
          { $push: { OuterwearPageShop: { item, productDescription, price, image: image.path, attribute } } }
        );
    
        if (result.matchedCount === 0) {
          console.log('Outerwear document not found');
          return res.status(404).json({ error: 'Outerwear document not found' });
        }
    
        console.log('Outerwear item added successfully');
        res.status(201).json({ message: 'Outerwear item added successfully' });
      } catch (error) {
        console.error('Error adding outerwear item:', error);
        res.status(500).json({ error: 'Failed to add outerwear item' });
      }
    });

    app.post("/upload-image", upload.single("image"), (req, res) => {
      try {
        console.log('Uploaded file:', req.file); // Check the uploaded file
        console.log('Request body:', req.body); // Check other form data
        res.status(200).json({ message: "Image uploaded successfully", filePath: req.file.path });
      } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({ error: "Failed to upload image" });
      }
    });


    app.post('/add-pants', upload.single('image'), async (req, res) => {
      try {
        const { item, productDescription, price, attribute } = req.body;
        const image = req.file;
    
        console.log('Received data for adding pants:', { item, productDescription, price, image, attribute });
    
        if (!item || !productDescription || !price || !image || !attribute) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const collection = db.collection('Pants');
        const result = await collection.updateOne(
          { mainTitle: 'Pants' },
          { $push: { PantsPageShop: { item, productDescription, price, image: image.path, attribute } } }
        );
    
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Pants document not found' });
        }
    
        res.status(201).json({ message: 'Pants item added successfully' });
      } catch (error) {
        console.error("Error adding pants item:", error);
        res.status(500).json({ error: "Failed to add pants item" });
      }
    });


    app.delete('/delete-account', authenticateUser, async (req, res) => {
      try {
        const email = req.user.email;
        const collection = usersDb.collection("users");
    
        // Find the user by email
        const user = await collection.findOne({ email });
    
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        const userId = user._id;
    
        // Delete the user
        const result = await collection.deleteOne({ _id: userId });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
    
        // Delete all orders associated with the user
        const ordersResult = await usersDb.collection('Orders').deleteMany({ userId: userId });
    
        res.status(200).json({ message: 'Account deleted successfully' });
      } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Failed to delete account" });
      }
    });

    app.post("/create-order", async (req, res) => {
      try {
        const { email, cartItems, total, formData } = req.body;
        const collection = usersDb.collection("users");
        const user = await collection.findOne({ email });

        if (user) {
          // User is registered, save the order with userId
          const ordersCollection = usersDb.collection("Orders");
          await ordersCollection.insertOne({
            userId: user._id,
            items: cartItems,
            total,
            shippingInfo: formData,
            createdAt: new Date(),
          });
          res.status(201).json({ message: "Order created and linked to user" });
        } else {
          // User is not registered, save the order without userId
          const ordersCollection = usersDb.collection("Orders");
          await ordersCollection.insertOne({
            items: cartItems,
            total,
            shippingInfo: formData,
            createdAt: new Date(),
          });
          res.status(201).json({ message: "Order created without user link" });
        }
      } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
      }
    });


    app.get(`/categories`, async (req, res) => {
      try {
        const collection = db.collection("Categories");
        console.log("Fetching data from 'categories' collection"); // Debugging log
        const data = await collection.find({}).toArray();
        console.log("Fetched data:", data); // Debugging log
        if (!data || data.length === 0) {
          res
            .status(404)
            .json({ error: "No data found in the categories collection." });
          return;
        }
        res.json(data);
      } catch (error) {
        console.error("Error fetching categories data:", error);
        res.status(500).json({ error: "Failed to fetch categories data." });
      }
    });

    app.listen(8080, () => {
      console.log("Backend server is running on http://localhost:8080");
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);