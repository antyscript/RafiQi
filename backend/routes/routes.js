const { Router } = require("express");
const control = require("../controller/controller");
const express = require("express");
const auth = require("../Middleware/auth");
const check = require("../Middleware/check");

const router = Router();

router.post("/login", check("login"), control.post_login);
router.post("/signup", check("signup"), control.post_signup);
router.get("/posts", control.get_posts);
router.post("/posts", auth, control.post_posts);
router.put("/posts/:id/like", auth, control.put_post_like)
module.exports = router;
