
const mongoose = require('mongoose');


const { MONGO_URI } = process.env;

console.log(MONGO_URI);

const connectDB = async () => {
  const conn = await  mongoose.connect(MONGO_URI)

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};




module.exports = connectDB;





