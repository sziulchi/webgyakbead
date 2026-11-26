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
router.get("/uzenetek", isLoggedIn, controller.uzenetekIndex);
router.get("/crud", isAdmin, controller.crudIndex);
    router.get("/crud/new", isAdmin, controller.crudNew);
    router.post("/crud/insert", isAdmin, controller.crudInsert);
    router.get("/crud/edit/:id", isAdmin, controller.crudEdit);
    router.post("/crud/update", isAdmin, controller.crudUpdate);
    router.get("/crud/delete/:id", isAdmin, controller.crudDelete);
router.get("/adatbazis", controller.adatbazisIndex);
router.get("/kapcsolat", controller.kapcsolatIndex);
router.post("/kapcsolat", controller.kapcsolatPost);
router.get("/diagram", controller.diagramIndex);
module.exports = router;