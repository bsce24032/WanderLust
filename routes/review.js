import express, { urlencoded } from "express";
const router = express.Router({mergeParams:true});
import wrapAsync from "../utils/wrapAsyc.js";
import Listing from "../models/listing.js";
import Review from "../models/review.js";
import { isLoggedIn, isReviewAurthor, validateReview } from "../middleware.js";
import { createReview, destroyReview } from "../controllers/reviews.js";



// post Review route
router.post("/", isLoggedIn , validateReview, wrapAsync(createReview));

// Delete Review Route
router.delete("/:reviewId",isLoggedIn, isReviewAurthor ,wrapAsync(destroyReview))

export default router;