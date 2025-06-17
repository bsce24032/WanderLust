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

  // Convert owner string to ObjectId
  const ownerId = new mongoose.Types.ObjectId("6800086869370052334a371b");

  let initData = data.map((obj) => ({
    ...obj,
    owner: ownerId,
  }));

  await Listing.insertMany(initData);
  console.log("Data Initialized in Db");
};

initDb();