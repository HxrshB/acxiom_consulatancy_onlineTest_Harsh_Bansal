import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import bookRoutes from "./routes/books.js";
import transactionRoutes from "./routes/transactions.js";
import categoryRoutes from "./routes/categories.js";
import Membership from './models/Membership.js';

/* App Config */
dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

/* Middlewares */
app.use(express.json());
app.use(cors());

/* API Routes */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/categories", categoryRoutes);

/* MongoDB connection */
mongoose.connect(
  process.env.MONGO_URL,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("MONGODB CONNECTED");
  }
);

app.post("/membership", (req, res) => {
  const { status, membershipType, from, to, updateMembership } = req.body;

  // Create a new membership document based on the schema
  const newMembership = new Membership({
    status,
    membershipType,
    from,
    to,
    updateMembership,
  });

  // Save the document to the database
  newMembership.save()
    .then(() => {
      res.status(200).json({ message: "Data received and saved successfully." });
    })
    .catch(err => {
      console.error("Error saving data:", err);
      res.status(500).json({ message: "Error saving data.", error: err });
    });
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});


app.get("/membership", async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.status(200).json(memberships);
  } catch (error) {
    res.status(500).json({ message: "Error fetching membership data" });
  }
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});

