const { Router } = require("express");
const { Room, Movie, Showtime } = require("../models");
const { createShowtime, updateShowtime, deleteShowtime, ticketRoom, ticketBooking } = require("../controllers/showtime.controllers");
const { authorize, authenticate } = require("../middlewares/auth/auth.middleware");
const { checkExist } = require("../middlewares/validations/check-exist.middlewares");

const showtimeRouter = Router();


showtimeRouter.post("/ticket-booking", authenticate, ticketBooking);

showtimeRouter.post("/", authenticate, authorize(["ADMIN"]), checkExist(Room, "id", "roomId"),
    checkExist(Movie, "id", "movieId"), createShowtime);

showtimeRouter.put("/:id", authenticate, authorize(["ADMIN"]), checkExist(Showtime),
    updateShowtime);

showtimeRouter.delete("/:id", authenticate, authorize(["ADMIN"]), checkExist(Showtime),
    deleteShowtime);
showtimeRouter.get("/:id", authenticate, checkExist(Showtime),
    ticketRoom);



module.exports = { showtimeRouter };