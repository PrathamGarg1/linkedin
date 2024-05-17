import mongoose from "mongoose";

const connectionString = 'mongodb+srv://pratham:CBbspFi3wmUUokhS@prathamgargcluster.l2yzgq5.mongodb.net/'

const connectDB = async () => {
    try {
      await mongoose.connect(connectionString);
    } catch (error) {
      console.error(error);
    }
  };
  
  export default connectDB;