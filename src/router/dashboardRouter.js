const router = require("express").Router();

const isLogin = require("../middleweare/checkAuth");

const dashboardCtrl = require("../controller/dashboardCtrl");

router.get("/dashboard", isLogin, dashboardCtrl.dashboard);
router.get("/dashboard/add", isLogin, dashboardCtrl.addPage);
router.post("/dashboard/add", isLogin, dashboardCtrl.addTask);

module.exports = router;
