import express, { urlencoded } from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsyc.js";
import Listing from "../models/listing.js";
import { isLoggedIn, isOwner, validateListing } from "../middleware.js";
import {
  createListing,
  index,
  renderNewFrom,
  showListing,
  renderEditForm,
  updateListing,
  destroyListing,
} from "../controllers/listings.js";

router
  .route("/")
  .get(wrapAsync(index)) // index
  .post(isLoggedIn, validateListing, wrapAsync(createListing)); //create


//new route
router.get("/new", isLoggedIn, renderNewFrom);

router
  .route("/:id")
  .get(wrapAsync(showListing)) // show
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(updateListing)) // update
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListing)); // delete



//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

export default router;
