const asyncHandler = require("express-async-handler")

const Lughet = require("../models/lughetModel")

// Get lughet by query string

const getLughets = asyncHandler(async (req, res) => {

    let q = req.query.q;

    const regexPattern = new RegExp(`^${q}`);

    const lughetsResult = await Lughet.find({ deutsch: { $regex: regexPattern, $options: "i" } })
        .limit(15); 
    res.status(200).json(lughetsResult)
})

// Add lughet to the Mongodg

const addLughets = asyncHandler(async (req, res) => {
    if (!req.body.deutsch) {
        res.status(400)
        throw new Error("تېكىست قوشۇڭ")
    }
    const lughets = await Lughet.create({
        deutsch: req.body.deutsch,
        artikel: req.body.artikel,
        verben: req.body.verben,
        uyghur: req.body.uyghur,
        satze: req.body.satze,
        uysatze: req.body.uysatze,
    })
    res.status(200).json(lughets)
})

// Get single lughet for update

const getcurrentlughets= asyncHandler(async(req, res)=>{
    
    const lughets= await Lughet.findById(req.params.id)
    if(!lughets){
        res.status(400)
        throw new Error("سۆز تېپىلمىدى")
    }
     res.status(200).json(lughets)
})


// Update lughet

const updateLughets = asyncHandler(async (req, res) => {
    console.log(req.params)
   
    const lughets = await Lughet.findById(req.params.id)
    if (!lughets) {
        res.status(400)
        throw new Error("سۆز تېپىلمىدى")
    }

    if (!req.editor) {
        res.status(401)
        throw new Error("Editor not found")
    }
    const updatedLughets = await Lughet.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
    res.status(200).json(updatedLughets)
})

const deleteLughets = asyncHandler(async (req, res) => {
    const lughets = await Lughet.findById(req.params.id)

    if (!lughets) {
        res.status(400)
        throw new Error("سۆزلۈك تېپىلمىدى")
    }
    await lughets.remove()
    res.status(200).json(req.params.id)
})

module.exports = {
    getLughets,
    addLughets,
    updateLughets,
    deleteLughets,
    getcurrentlughets
}                                                                                                                   