const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      retryReads: true,
      maxPoolSize: 10,
    });
    console.log("✓ MongoDB connected successfully");
  } catch (error) {
    console.error("✗ DB connection failed:", error.message);
    console.log("Retrying in 5 seconds...");
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

module.exports = connectDB;
