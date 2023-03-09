const userRouter = require('express').Router();
const { signin, signup, updateUser, withGoogle, getAll, deleteUser } = require("../controllers/user-controllers");

userRouter.route('/')
    .patch((req, res) => {
        updateUser(req, res)
    })
    .get((req, res) => {
        getAll(req, res)
    })
userRouter.route('/login')
    .post((req, res) => {
        signin(req, res)
    })
userRouter.route('/signup')
    .post((req, res) => {
        signup(req, res);
    })
userRouter.route('/google')
    .post((req, res) => {
        withGoogle(req, res)
    })
userRouter.route('/:id')
    .delete((req, res) => {
        deleteUser(req, res)
    })


module.exports = userRouter;
