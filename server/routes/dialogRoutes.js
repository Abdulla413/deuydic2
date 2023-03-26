const express = require("express");
const router = express.Router()

const { getDialogs, addDialogs, updateDialogs, deleteDialogs, getcurrentDialogs } = require("../controllers/dialogController")

const { protect } = require("../middleware/authMiddleware")



router.route("/").get(getDialogs).post(addDialogs)

router.route("/:id").put(protect, updateDialogs).delete(protect, deleteDialogs).get(getcurrentDialogs)





module.exports = router;
