import express, { urlencoded } from "express";
const router = express.Router({mergeParams:true});
import wrapAsync from "../utils/wrapAsyc.js";
import ExpressError from "../utils/ExpressError.js";
import Listing from "../models/listing.js";
import { reviewSchema } from "../schema.js";
import Review from "../models/review.js";


const validateReview = (req, re, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


// post Review route
router.post("/", validateReview, wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    const newReview = new Review(req.body.review);
      listing.reviews.push(newReview._id);  

    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

// Delete Review Route
router.delete("/:reviewId",wrapAsync(async(req,res)=>{
  let {id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/listings/${id}`);
}))

export default router;