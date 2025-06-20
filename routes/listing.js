import express, { urlencoded } from "express";
const router = express.Router();
import wrapAsync from "../utils/wrapAsyc.js";
import Listing from "../models/listing.js";
import { isLoggedIn, isOwner, validateListing } from "../middleware.js";
import multer from "multer";
import {
  createListing,
  index,
  renderNewFrom,
  showListing,
  renderEditForm,
  updateListing,
  destroyListing,
} from "../controllers/listings.js";

import { storage } from "../cloudConfig.js";
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(index)) // index
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(createListing)
  ); //create

router.get(
  "/search",
  wrapAsync(async (req, res) => {
    let search = req.query.search;

    if (search && search.trim() !== "") {
      let searchedListing = await Listing.find({ country: search });

      if (searchedListing.length === 0) {
        // Optionally add a flash message or query param
        req.flash("error", "No listings found for that country.");
        return res.redirect("/listings");
      }

      // If results found
      return res.render("index.ejs", { allListings: searchedListing });
    }

    // If search is empty or invalid
    res.redirect("/listings");
  })
);

//new route
router.get("/new", isLoggedIn, renderNewFrom);

router
  .route("/:id")
  .get(wrapAsync(showListing)) // show
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(updateListing)
  ) // update
  .delete(isLoggedIn, isOwner, wrapAsync(destroyListing)); // delete

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

export default router;
