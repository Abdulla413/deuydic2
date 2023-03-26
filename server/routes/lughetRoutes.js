const express = require("express");
const router = express.Router()

const { getLughets, addLughets, updateLughets, deleteLughets, getcurrentlughets } = require("../controllers/lughetController")

const { protect } = require("../middleware/authMiddleware")



router.route("/").get(getLughets).post(protect, addLughets)

router.route("/:id").put(protect, updateLughets).delete(protect, deleteLughets).get(getcurrentlughets)





module.exports = router;
