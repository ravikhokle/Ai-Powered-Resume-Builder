import mongoose from 'mongoose';

const DBURL = process.env.DBURL;

const DBConnect = async () => {
  try {
     await mongoose.connect(DBURL);
    console.log('DB connected');
  } catch (error) {
    console.log('DB connection error');
  }
}

export default DBConnect;