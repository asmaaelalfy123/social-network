const mongoose = require('mongoose');

const config = require('config');

const db = config.get('MONGO_URI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.log('DB connected');
  } catch (error) {
    console.error(error.message);

    //Exit Process
    process.exit(1);
  }
};

module.exports = connectDB;
