import Listing from "../models/listing.js";
import Review from "../models/review.js";


const createReview = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        return res.status(404).send("Listing not found");
    }

    const newReview = new Review(req.body.review);
     newReview.aurthor = req.user._id;
      listing.reviews.push(newReview._id); 
      console.log(newReview) ;

    await newReview.save();
    await listing.save();
    console.log(listing);
    req.flash("sucess"," New Review Created! ");
    res.redirect(`/listings/${listing._id}`);
}



const destroyReview = async(req,res)=>{
  let {id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("sucess","Review Deleted!");
  res.redirect(`/listings/${id}`);
}

export { createReview , destroyReview}