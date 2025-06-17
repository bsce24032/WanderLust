import User from "../models/user.js";


const renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

const signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("sucess", " welcome to wanderlust!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    return res.redirect("/listings");
  }
};

const renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

const login = async (req, res) => {
  req.flash("sucess", "Welcome back to Wanderlust!");
  if (res.locals.redirectUrl) {
    return res.redirect(res.locals.redirectUrl);
  }
  return res.redirect("/listings");
};

const logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("sucess", "you are logged out ");
    res.redirect("/listings");
  });
};

export { signup, renderLogin, renderSignupForm, login, logout };
