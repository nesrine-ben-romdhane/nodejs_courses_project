const express = require("express")
const validation = require("../midellware/midelware.course")
const router = express.Router();

const controlresCourse = require("../controlers/controllers.courses");
const verefy_token = require("../midellware/auth_verify_token");
const userRole = require("../utils/user_roles");
const allwadeto = require("../midellware/allwadeto");


// create course 

// router.post( "/addcourse",validation,controlresCourse.addcourse)

router.post( "/addcourse",controlresCourse.addcourse)
router.get("/allcourse",controlresCourse.allcourse)

// put et patch pour modifier mais put: suprimme l ancien objet et metre le vouvelle objet et patch faire les modification sur l ancien objet

router.route("/:courseid")
// .route pour executer les methode patch delete avec lla meme chemain /:courseid
    .patch(controlresCourse.updatecourse)
    .delete(verefy_token,allwadeto(userRole.ADMIN,userRole.MANGER),controlresCourse.deletecourse)



//////////////////////////////////////


module.exports=router