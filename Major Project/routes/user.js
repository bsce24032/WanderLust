import express, { urlencoded } from "express";
const router = express.Router();
import User from "../models/user.js";
import wrapAsync from "../utils/wrapAsyc.js";
import passport from "passport";

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("sucess", " welcome to wanderlust!");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", e.message);
      return res.redirect("/listings");
    }
  })
);

router.get("/login", (req, res) => {
  res.render("users/login.ejs");
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(async (req, res) => {
    req.flash("sucess","Welcome back to Wanderlust!");
    res.redirect("/listings");
  })
);

export default router;
