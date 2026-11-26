const User = require("../models/User");
const suti = require("../models/suti");
const ar = require("../models/ar");
const tartalom = require("../models/tartalom");
const uzenet = require("../models/uzenet");
const bcrypt = require("bcrypt");

exports.homeIndex = (req, res) => { res.render("home"); };
exports.crudIndex = (req, res) => { res.render("crud"); };
exports.adatbazisIndex = (req, res) => { res.render("adatbazis"); };
exports.kapcsolatIndex = (req, res) => { res.render("kapcsolat"); };

exports.uzenetekIndex = async (req, res) => {
    const uzenetek = await uzenet.find().sort({ createdAt: -1 });
    res.render("uzenetek", { uzenetek });
};

exports.diagramIndex = async (req, res) => {
    const sutik = await suti.find();
    const darab = {};
    sutik.forEach(s => {
        darab[s.tipus] = (darab[s.tipus] || 0) + 1;
    });
    res.render("diagram", { tipusok: Object.keys(darab), darabok: Object.values(darab) });
};

exports.registerGet = (req, res) => { res.render("register"); };
exports.registerPost = async (req, res) => {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        req.session.message = "This user already exists!";
        return res.redirect("/register");
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({ username: req.body.username, password: hash, role: "user" });
    req.session.message = "Successful registration! You can log in.";
    res.redirect("/login");
};

exports.loginGet = (req, res) => { res.render("login"); };
exports.loginPost = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        req.session.message = "Login failed!";
        return res.redirect("/login");
    }
    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) {
        req.session.message = "Login failed!";
        return res.redirect("/login");
    }
    req.session.user = { id: user._id, username: user.username, role: user.role };
    if (user.role === "admin") {
        res.redirect("/");
    } else {
        res.redirect("/");
    }
};

exports.logout = (req, res) => {
    req.session.destroy(() => { res.redirect("/"); });
};



exports.adatbazisIndex = async (req, res) => {
    const sutik = await suti.find().sort({nev: 1 });
    const arak = await ar.find();
    const tartalmak = await tartalom.find();
    res.render("adatbazis", {sutik, arak, tartalmak});
    /*console.log(sutik.length, arak.length, tartalmak.length);*/
};




exports.crudIndex = async (req, res) => {
    const sutik = await suti.find().sort({ id: 1 });
    res.render("crud", { sutik });
};
exports.crudNew = (req, res) => { res.render("crud_new"); };
exports.crudInsert = async (req, res) => {
    const utolso = await suti.findOne().sort({ id: -1 });
    await suti.create({ id: utolso.id + 1, nev: req.body.nev, tipus: req.body.tipus, dijazott: req.body.dijazott });
    res.redirect("/crud");
};
exports.crudEdit = async (req, res) => {
    const egySuti = await suti.findById(req.params.id);
    res.render("crud_edit", { suti: egySuti });
};
exports.crudUpdate = async (req, res) => {
    await suti.findByIdAndUpdate(req.body.id, { nev: req.body.nev, tipus: req.body.tipus, dijazott: req.body.dijazott });
    res.redirect("/crud");
};
exports.crudDelete = async (req, res) => {
    await suti.findByIdAndDelete(req.params.id);
    res.redirect("/crud");
};

exports.kapcsolatIndex = (req, res) => {
    res.render("kapcsolat", { adat: {}, hibak: {} });
};
exports.kapcsolatPost = async (req, res) => {
    try {
        await uzenet.create({ nev: req.body.nev, email: req.body.email, uzenet: req.body.uzenet });
        req.session.message = "Üzenet elküldve";
        res.redirect("/kapcsolat");
    } catch (err) {
        if (err.name === "ValidationError") {
            return res.render("kapcsolat", { adat: req.body, hibak: err.errors });
        }
        res.status(500).send("Szerverhiba.");
    }
};