import mongoose from "mongoose";
import { data } from "./data.js";
import Listing from "../models/listing.js";
main()
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDb = async () => {
  await Listing.deleteMany({});
  await Listing.insertMany(data);
  console.log("Data Initialized in Db");
};

initDb();
