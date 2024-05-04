const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://FoodOrder:Ruchi%4012345@cluster0.v7gywp1.mongodb.net/FoodOrder?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURL, { useNewUrlParser: true });
    console.log("Connected to MongoDB");
    const fetchedData = await mongoose.connection.db.collection("food_items");
    fetchedData.find({}).toArray(async function (err, data) {
      const foodCategory = await mongoose.connection.db.collection("foodCategory");
      foodCategory.find({}).toArray(function (err, catData) {
        if (err) {
          console.log(err);
        } else {
          global.food_items = data;
          global.foodCategory = catData;
        }
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = connectToDB;
