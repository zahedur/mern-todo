const express = require('express');
const AuthMiddleware = require('../middleware/AuthMiddleware');
const AuthController = require('../controllers/AuthController');
const UserController = require("../controllers/UsersController");
const ProfileController = require("../controllers/ProfileController");
const TodosController = require("../controllers/TodosController");

const router = express.Router();

//Auth and profile
router.post("/register", AuthController.Register);
router.post("/login", AuthController.Login);
router.get("/profile", AuthMiddleware, ProfileController.Profile);
router.post("/update-profile", AuthMiddleware, ProfileController.UpdateProfile);
router.post("/change-password", AuthMiddleware, ProfileController.changePassword);


// Users
router.get("/users", AuthMiddleware, UserController.Index);
router.post("/users/create", AuthMiddleware, UserController.Create);
router.post("/users/edit", AuthMiddleware, UserController.Edit);
router.post("/users/update", AuthMiddleware, UserController.Update);
router.post("/users/delete", AuthMiddleware, UserController.Delete);


// Todos
router.get("/todos", AuthMiddleware, TodosController.Index);
router.post("/todos/create", AuthMiddleware, TodosController.Create);
router.post("/todos/edit", AuthMiddleware, TodosController.Edit);
router.post("/todos/update", AuthMiddleware, TodosController.Update);
router.post("/todos/delete", AuthMiddleware, TodosController.Delete);
router.post("/todos/view", AuthMiddleware, TodosController.View);
router.post("/todos/status", AuthMiddleware, TodosController.ChangeStatus);


module.exports = router;
