const{ body} = require("express-validator")
const validation = ()=>{
    return  [
        body('title')
        .notEmpty()
        .withMessage("title is require")
        .isLength({min : 2 })
        .withMessage("title at least is 2 digits"),
        body('price')
        .notEmpty()
        .withMessage("price is require")
    ]

}
module.exports = validation