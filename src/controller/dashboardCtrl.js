const mongoose = require("mongoose");

const TaskModel = require("../model/taskModel");

const dashboardCtrl = {
  dashboard: async (req, res) => {
    const locals = {
      title: "Dashboard task | app",
      description: "NodeJS, Salomat, Matiz",
    };

    let perPage = 6;
    let page = req.query.page * 1 || 1;

    try {
      // tasks
      const tasks = await TaskModel.aggregate([
        { $sort: { updatedAt: -1 } },
        { $match: { user: new mongoose.Types.ObjectId(req.user.id) } },
      ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

      let count = await TaskModel.find({ user: req.user.id });

      count = count.length;

      res.render("dashboard/index", {
        userName: req.user.firstName,
        photo: req.user.profileImage,
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
  // view a task
  viewTask: async (req, res) => {
    const { id } = req.params;

    try {
      const task = await TaskModel.findById(id);
      if (task) {
        res.render("dashboard/viewTask", {
          taskId: id,
          task,
          layout: "../views/layouts/dashboard",
        });
      } else {
        res.send("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  },
  // update
  updateTask: async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;
    try {
      await TaskModel.findByIdAndUpdate(
        { _id: id },
        { title, body, updatedAt: Date.now() }
      );
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  },
  // delete
  deleteTask: async (req, res) => {
    const { id } = req.params;
    try {
      await TaskModel.findByIdAndDelete(id);
      res.redirect("/dashboard");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = dashboardCtrl;
