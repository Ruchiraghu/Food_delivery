const mongoose = require("mongoose");
const mongoURL = MONGO_URL

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
