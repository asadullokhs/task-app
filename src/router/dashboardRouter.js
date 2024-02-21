const router = require("express").Router();

const isLogin = require("../middleweare/checkAuth");

const dashboardCtrl = require("../controller/dashboardCtrl");

router.get("/dashboard", isLogin, dashboardCtrl.dashboard);
router.get("/dashboard/add", isLogin, dashboardCtrl.addPage);
router.get("/dashboard/item/:id", isLogin, dashboardCtrl.viewTask);
router.post("/dashboard/add", isLogin, dashboardCtrl.addTask);
router.post("/dashboard/update/:id", isLogin, dashboardCtrl.updateTask);

module.exports = router;
