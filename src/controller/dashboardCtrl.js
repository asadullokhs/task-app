const mongoose = require("mongoose");

const TaskModel = require("../model/taskModel");

const dashboardCtrl = {
  dashboard: async (req, res) => {
    const locals = {
      title: "Dashboard task | app",
      description: "NodeJS, Salomat, Matiz",
    };

    let perPage = 6;
    let page = req.query.page || 1;

    try {
      // tasks
      const tasks = await TaskModel.aggregate([
        { $sort: { updatedAt: -1 } },
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

      const count = await TaskModel.find({ user: req.user.id }).count();

      res.render("dashboard/index", {
        userName: req.user.firstName,
        current: page,
        pages: Math.ceil(count / perPage),
        locals,
        tasks,
        layout: "../views/layouts/dashboard",
      });
    } catch (error) {
      console.log(error);
    }
  },

  // get create task page
  addPage: async (req, res) => {
    res.render("dashboard/add", { layout: "../views/layouts/dashboard" });
  },

  // Add new task
  addTask: async (req, res) => {
    req.body.user = req.user.id;
    try {
      await TaskModel.create(req.body);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = dashboardCtrl;
