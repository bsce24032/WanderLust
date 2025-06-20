import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema({
  comment: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  date: {
    type: Number,
    default: Date.now(),
  },
  aurthor:{
    type:Schema.Types.ObjectId,
    ref:"User"
  }
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
