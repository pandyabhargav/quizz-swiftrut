// db.connection.js
const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to DB`);
  } catch (error) {
    console.error('Error connecting to DB:', error);
  }
};

module.exports = dbConnection;
