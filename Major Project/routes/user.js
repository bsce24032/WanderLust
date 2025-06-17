import express, { urlencoded } from "express";
const router = express.Router();

import wrapAsync from "../utils/wrapAsyc.js";
import passport from "passport";
import { saveRedirectUrl } from "../middleware.js";
import {
  login,
  logout,
  renderLogin,
  renderSignupForm,
  signup,
} from "../controllers/users.js";

router.route("/signup").get(renderSignupForm).post(wrapAsync(signup));

router
  .route("/login")
  .get(renderLogin)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    wrapAsync(login)
  );

router.get("/logout", logout);

export default router;
