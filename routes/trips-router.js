const tripRouter = require('express').Router();
const { addTrip, deleteTrip, updateTrip, getTrips } = require("../controllers/trips-controller");

tripRouter.route('/')
    .post((req, res) => {
        addTrip(req, res)
    })
    .get((req, res) => {
        getTrips(req, res)
    })

tripRouter.route('/:name')
    .delete((req, res) => {
        deleteTrip(req, res)
    })
    .patch((req, res) => {
        updateTrip(req, res)
    })



module.exports = tripRouter;
