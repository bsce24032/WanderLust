import Listing from "../models/listing.js";
import dotenv from "dotenv";
dotenv.config();
import mapbox from '@mapbox/mapbox-sdk/index.js';
import mbxGeocoding from '@mapbox/mapbox-sdk/services/geocoding.js';

const mapToken = process.env.MAP_TOKEN;
const mbxClient = mapbox({ accessToken: mapToken });
const geocodingClient = mbxGeocoding(mbxClient);

const index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("index.ejs", { allListings });
};

const renderNewFrom = (req, res) => {
  res.render("new.ejs");
};

const showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "aurthor" } })
    .populate({ path: "owner", select: "username" }); // ✅ FIXED

  if (!listing) {
    req.flash("error", " Listing you requested does not exist! ");
    return res.redirect("/listings");
  }

  res.render("show.ejs", { listing });
};

const createListing = async (req, res, next) => {
let response = await   geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();


  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("sucess", " New Listing Created! ");
  res.redirect("/listings");
};

const renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", " Listing you requested does not exist! ");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  let editedImageUrl = originalImageUrl.replace(
    "/upload/",
    "/upload/w_300,c_fill/"
  );
  res.render("edit.ejs", { listing, editedImageUrl });
};

const updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  let url = req.file.path;
  if (typeof req.file !== "undefined") {
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("sucess", "Listing Updated! ");
  res.redirect(`/listings/${id}`);
};

const destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  // console.log(deletedListing);
  req.flash("sucess", "Listing Deleted!");
  res.redirect("/listings");
};

export {
  index,
  renderNewFrom,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  destroyListing,
};
