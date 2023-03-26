const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler")
const Editor = require("../models/editorModel");

// @ desc Register editor
//@route POST  /api/editor

const registerEditor = asyncHandler(async (req, res) => {
    const { name, email, password, rohset } = req.body

    if (!name || !email || !password || !rohset) {
        res.status(400)
        throw new Error("Please add all fields")
    }

    //Check if user exists

    const editorExists = await Editor.findOne({ email })

    if (editorExists) {
        throw new Error("Editor already exists")
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    // Ckeck if validation is correct


    if (process.env.SIGNUP_VALIDATION === rohset) {
        // Create Editor
        const editor = await Editor.create({
            name,
            email,
            password: hashPassword
        })

        if (editor) {
            res.status(201).json({
                _id: editor.id,
                name: editor.name,
                email: editor.email,
                token: generateToken(editor._id)
            })
        }

    } else {
        res.status(400)
        throw new Error("Invalid editor data")
    }
})


// @ desc Register editor
//@route POST  /api/editor/login

const loginEditor = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const editor = await Editor.findOne({ email })
    if (editor && (await bcrypt.compare(password, editor.password))) {
        res.json({
            _id: editor.id,
            name: editor.name,
            email: editor.email,
            token: generateToken(editor._id)
        })
    } else {
        res.status(400)
        throw new Error("Invalid credentials")
    }

})


//Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15d" })
}





module.exports = {
    registerEditor,
    loginEditor
}