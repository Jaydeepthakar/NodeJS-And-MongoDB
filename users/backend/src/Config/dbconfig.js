const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      autoIndex: false
    });
    console.log("MongoDB connection successful");

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    console.log("MongoDB URI:", process.env.MONGO_URL);
  }
}

module.exports = { connectDB };
