const User = require("../models/user");
const viewPath = "users";

exports.create = async (req, res) => {
  try {
    const user = new User(req.body);
    await User.register(user, req.body.password);

    req.flash(
      "success",
      `Welcome, ${user.fullname}. Thank you for registering.`
    );
    res.redirect("/");
  } catch (error) {
    console.log(error.message);
    req.flash("danger", error.message);
    req.session.formBook = req.body;
    res.redirect(`/register`);
  }
};
