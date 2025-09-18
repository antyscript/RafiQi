const { Router } = require("express");
const control = require("../controller/controller");
const express = require("express");
const auth = require("../Middleware/auth");

/*useEffect(() => {
  fetch("/me", {
    credentials: "include"
  })
   */
const router = Router();

router.post("/login", control.post_login);
router.post("/signup", control.post_signup);
router.get("/posts", control.get_posts);
router.post("/posts", auth, control.post_posts);
module.exports = router;
