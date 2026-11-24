const router = require("express").Router();
const controller = require("../controllers/mainController");

isLoggedIn=(req,res,next)=>{
    if(req.session.user){return next();}
    res.redirect("/login");
}
isAdmin=(req,res,next)=>{
    if(req.session.user && req.session.user.role==="admin"){return next();}
    res.redirect("/");
}

router.get("/", controller.homeIndex);
router.get("/register", controller.registerGet);
router.post("/register", controller.registerPost);
router.get("/login", controller.loginGet);
router.post("/login", controller.loginPost);
router.get("/logout", controller.logout);
router.get("/uzenetek", isLoggedIn, controller.uzenetIndex);
router.get("/crud", isAdmin, controller.crudIndex);
router.get("/adatbazis", controller.adatbazisIndex);
router.get("/kapcsolat", controller.kapcsolatIndex);
router.get("/diagram", controller.diagramIndex);
module.exports = router;