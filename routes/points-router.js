const pointRouter = require('express').Router();
const { addPoint, deletePoint, editPoint, getAllPoints, getPointsOf1Trip } = require("../controllers/point-controllers");

pointRouter.route('/')
    .post((req, res) => {
        addPoint(req, res)
    })
    .get((req, res) => {
        getAllPoints(req, res)
    })
pointRouter.route('/:trip/:id')
    .delete((req, res) => {
        deletePoint(req, res)
    })
    .patch((req, res) => {
        editPoint(req, res)
    })
pointRouter.route('/:trip')
    .get((req, res) => {
        getPointsOf1Trip(req, res)
    })




module.exports = pointRouter;
