import mongoose from 'mongoose';
import config from 'config';

const db: string = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Conneted...');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
