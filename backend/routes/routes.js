const { Router } = require("express");
const control = require("../controller/controller");

const router = Router();

router.post("/login", control.post_login);
router.post("/signup", control.post_signup);
router.get("/posts", control.get_posts);

module.exports = router;
