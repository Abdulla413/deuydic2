const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const Editor = require("../models/editorModel")


const protect = asyncHandler(async (req, res, next) => {

    console.log(req.headers.authorization, "this is header....")

    // Check for Editor
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(" ")[1]
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from the token

            req.editor = await Editor.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("No authorization")
        }
    }

    if (!token) {
        res.status(401)
        throw new Error("No authorization , no token")
    }

})

module.exports = { protect }