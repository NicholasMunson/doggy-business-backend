const express = require("express")
const router = express.Router()
 const Dogs = require("../../models/dogSchema.js")

router.get("/", (req, res) => {
    Dogs.find()
    .sort({ name: -1 })
    .then(dogs => res.json(dogs))
})
router.get("/:id", (req, res) => {
    Dogs.findById(req.params.id)
    .sort({ name: -1 })
    .then(dog => res.json(dog))
})

router.post("/", (req, res) => {
    const newDog = new Dogs({
        name: req.body.name,
        img: req.body.img
    })
    newDog.save().then(dog => res.json(dog))
})

router.delete("/:id", (req, res) => {
    Dogs.findById(req.params.id)
    .then(dog => dog.remove().then(() => res.json({success: "deleted"})))
    .catch(err => res.status(404).json({error: "Not Found"}))
})
module.exports = router