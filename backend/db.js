const mongoose = require('mongoose');
require('dotenv').config()
const uri = process.env.DB_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

const mongoDb =async function (){
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const fetch_data = await mongoose.connection.db.collection("food_items");
    const data = await fetch_data.find({}).toArray()
    
    global.food_items=data;
    const foodcategory = await mongoose.connection.db.collection("food_category");
    const catdata = await foodcategory.find({}).toArray()
    global.foodcategory= catdata;
    console.log("done")
  } 
  finally {
    // Ensures that the client will close when you finish/error
    // await mongoose.disconnect();
  }
}




module.exports=mongoDb;