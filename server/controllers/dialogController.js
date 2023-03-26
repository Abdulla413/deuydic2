const asyncHandler = require("express-async-handler")

const dialog = require("../models/dialogModel")

// Get lughet by query string

const getDialogs = asyncHandler(async (req, res) => {

    let q = req.query.q;
    console.log(q)

    const dialogs = await dialog.find({ topic: { $regex: `${q}`, $options: "i" } })
    res.status(200).json(dialogs)
})

// Add dialog to the Mongodg

const addDialogs = asyncHandler(async (req, res) => {
    console.log(req.body, "this is request body")
    const {value, lable } = req.body.selectedOption
    console.log(value)
    if (!req.body.deutschq) {
        res.status(400)
        throw new Error("تېكىست قوشۇڭ")
    }
    const dialogs = await dialog.create({
        deutschq: req.body.deutschq,
        uyghurq: req.body.uyghurq,
        deutscha:req.body.deutscha,
        uyghura:req.body.uyghura,
        topic: value,
    })
    res.status(200).json(dialogs)
})

// Get single lughet for update

const getcurrentDialogs= asyncHandler(async(req, res)=>{
    console.log(req.body)


    const dialogs= await dialog.findById(req.params.id)
    if(!dialogs){
        res.status(400)
        throw new Error("سۆز تېپىلمىدى")
    }
     res.status(200).json(dialogs)
})



// Update lughet

const updateDialogs = asyncHandler(async (req, res) => {
    console.log(req.params)
   
    const dialogs = await dialog.findById(req.params.id)
    if (!dialogs) {
        res.status(400)
        throw new Error("سۆز تېپىلمىدى")
    }

    if (!req.editor) {
        res.status(401)
        throw new Error("Editor not found")
    }
    const updatedDialogs = await dialog.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedDialogs)
})

const deleteDialogs = asyncHandler(async (req, res) => {
    const dialogs = await dialog.findById(req.params.id)

    if (!dialogs) {
        res.status(400)
        throw new Error("سۆزلۈك تېپىلمىدى")
    }
    await lughets.remove()
    res.status(200).json(req.params.id)
})

module.exports = {
    getDialogs,
    addDialogs,
    updateDialogs,
    deleteDialogs,
    getcurrentDialogs
}