import wrapAsync from "./utils/wrapAsyc.js";
import Listing from "./models/listing.js";
import { listingSchema , reviewSchema } from "./schema.js";
import ExpressError from "./utils/ExpressError.js";
import Review from "./models/review.js";



const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirectUrl save
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create a listing");
    return res.redirect("/login");
  }
  next();
};

const saveRedirectUrl = (req, res, next) => {
if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
}
next();
};


const isOwner = wrapAsync(async(req,res,next)=>{
   let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currUser._id)) {
      req.flash("error","You are not the owner of the listing");
      return res.redirect(`/listings/${id}`);
    } 
    next();
});


const validateListing = (req, re, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


const validateReview = (req, re, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


const isReviewAurthor = wrapAsync(async(req,res,next)=>{
   let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.aurthor.equals(res.locals.currUser._id)) {
      req.flash("error","You are not the aurthor of the review");
      return res.redirect(`/listings/${id}`);
    } 
    next();
});



export  { isLoggedIn , saveRedirectUrl, isOwner , validateListing , validateReview , isReviewAurthor};
