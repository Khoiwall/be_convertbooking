const mongoose = require("mongoose");

const option = {
  // socketTimeoutMS: 30000,
  // keepAlive: true,
  // reconnectTries: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

async function connectDB(user: string, password: string) {
  try {
    await mongoose.connect(
      `mongodb+srv://${user}:${password}@cluster0.7hzslhj.mongodb.net/?retryWrites=true&w=majority`,
      option
    );
    console.log("Connect sucessful!!!!!!!!");
  } catch (e) {
    console.log("Connect failed!!!!!!!!");
  }
}

module.exports = { connectDB };
