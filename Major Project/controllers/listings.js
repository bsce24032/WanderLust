import Listing from "../models/listing.js";

const index = async (req, res) => {
  const allListings = await Listing.find();
  res.render("index.ejs", { allListings });
};

const renderNewFrom = (req, res) => {
  res.render("new.ejs");
};

const showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "aurthor" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", " Listing you requested does not exist! ");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("show.ejs", { listing });
};

const createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  await newListing.save();
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
  res.render("edit.ejs", { listing });
};

const updateListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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
