const express = require("express")
const database = require("../../database/index")
const bcryptjs = require("bcryptjs")
const router = express.Router();

router.get("/", async (req, res) =>{

    if(req.session.name == null && req.session.password == null){
        res.redirect("/login")
    }else{
        const admin = await database.collection("admin").where("name", "==", req.session.name).where("password", "==", req.session.password).get();

        if(admin.empty){
            res.redirect("/login")
        }else{
            res.redirect("/victims")
        }
    }

});

router.get("/login", async (req, res) =>{

    const token = await bcryptjs.hash("Roxanna", 2)

    res.render("index/login",{
        title: "Login",
        style: "index/login",
        token
    })
});

router.post("/login", async (req, res) =>{

    const admin = await database.collection("admin").where("name", "==", req.body.name).where("password", "==", req.body.password).get()

    if(admin.empty){
        res.send("0")
    }else{

        bcryptjs.compare("Roxanna", req.body.token, function(err, res){
            if(err){
                res.send("0")
            }
        })


        req.session.name = req.body.name
        req.session.password = req.body.password

        res.send("1")
    }

});

module.exports = router;