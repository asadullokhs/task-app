const router = require("express").Router();

const mainCtrl = require("../controller/mainCtrl");

router.get("/", mainCtrl.home);
router.get("/about", mainCtrl.about);
router.get("/contact", mainCtrl.contact);
router.post("/contact/send", mainCtrl.sendMail);

module.exports = router;
