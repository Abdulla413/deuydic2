const express = require("express");
const router = express.Router();
const { registerEditor, loginEditor } = require("../controllers/editorController");

router.post("/", registerEditor)
router.post("/login", loginEditor)

module.exports = router