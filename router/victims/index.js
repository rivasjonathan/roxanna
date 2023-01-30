const express = require("express");
const database = require("../../database/index");
const bcryptjs = require("bcryptjs")
const router = express.Router();

const auth = async (req, res, next) => {

    if (req.session.name == null && req.session.password == null) {
        res.redirect("/login")

    } else {
        const admin = await database.collection("admin").where("name", "==", req.session.name).where("password", "==", req.session.password).get()

        if(admin.empty){
            res.redirect("/login")
        }

    }

    return next();

}

router.get("/", auth, async (req, res) => {

    const collection_victims = await database.collection("users").get();
    const victims_data = collection_victims.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const token = await bcryptjs.hash("Roxanna", 2)

    res.render("victims/index", {
        title: "Victims",
        style: "victims/index",
        victims: victims_data,
        token
    });

});


module.exports = router;