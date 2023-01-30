
$(document).ready(function () {
    table_documents = $('#documents').DataTable({
        ajax:{
            url: "/victim/documents",
            method: "POST",
            data:{
                id: document.getElementById("victim_id").value
            },
            dataSrc: ""
        },
        columns:[
            {data: "id"},
            {defaultContent: '<button class="btn btn-success view_documents"><i class="fas fa-eye"></i></button>     <button class="btn btn-danger delete_documents"><i class="fas fa-trash-alt"></i></button>'}
        ],
        lengthMenu: [[10, 100, 1000, -1], [10, 100, 1000, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search:"
        },
        dom: "lBfrtip",
        buttons:[
            {
                text: '<i class="fas fa-sync-alt"></i>',
                className: "btn btn-primary recargar",
                action: function(){
                    table_documents.ajax.reload(null, false)
                },
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
            {
                text: '<i class="fas fa-file-excel"></i>',
                extend: 'excelHtml5',
                className: "btn btn-success",
                autoFilter: true,
                sheetName: 'Exported data',
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
        ]
    });
});


$(document).on("click", ".view_documents", function(){

    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    window.location.href = "/victim/" + document.getElementById("victim_id").value + "/documents/" + date + "/files"

})

$(document).on("click", ".delete_documents", function (){
    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    Swal.fire({
        icon: "question",
        html: '<h2 style="color: white;">Do you want delete this date?</h2>'+
        '<h3 style="color: white;">'+date+'</h3>'+
        '<button style="margin: 10px;" id="yes" class="btn btn-success">Yes</button>'+
        '<button style="margin: 10px;" id="no" class="btn btn-danger">No</button>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })

    document.getElementById("yes").addEventListener("click", () =>{
        $.ajax({
            url: "/victim/" + document.getElementById("victim_id").value + "/documents",
            method: "DELETE",
            data:{
                date
            },
            success: function(response){

                table_documents.ajax.reload(null, false)

                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red">Delete failed</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white">Delete success</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }
               
            }

        })
    })

    document.getElementById("no").addEventListener("click", () =>{
        Swal.close()
    })
})

$(document).ready(function () {
    table_images = $('#images').DataTable({
        ajax:{
            url: "/victim/images",
            method: "POST",
            data:{
                id: document.getElementById("victim_id").value
            },
            dataSrc: ""
        },
        columns:[
            {data: "id"},
            {defaultContent: '<button class="btn btn-success view_images"><i class="fas fa-eye"></i></button>     <button class="btn btn-danger delete_images"><i class="fas fa-trash-alt"></i></button>'}
        ],
        lengthMenu: [[10, 100, 1000, -1], [10, 100, 1000, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search:",
        },
        dom: "lBfrtip",
        buttons:[
            {
                text: '<i class="fas fa-sync-alt"></i>',
                className: "btn btn-primary recargar",
                action: function(){
                    table_images.ajax.reload(null, false)
                },
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
            {
                text: '<i class="fas fa-file-excel"></i>',
                extend: 'excelHtml5',
                className: "btn btn-success",
                autoFilter: true,
                sheetName: 'Exported data',
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
        ]
    });
});

$(document).on("click", ".view_images", function(){

    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    window.location.href = "/victim/" + document.getElementById("victim_id").value + "/images/" + date + "/files"

})

$(document).on("click", ".delete_images", function (){
    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    Swal.fire({
        icon: "question",
        html: '<h2 style="color: white;">Do you want delete this date?</h2>'+
        '<h3 style="color: white;">'+date+'</h3>'+
        '<button style="margin: 10px;" id="yes" class="btn btn-success">Yes</button>'+
        '<button style="margin: 10px;" id="no" class="btn btn-danger">No</button>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })

    document.getElementById("yes").addEventListener("click", () =>{
        $.ajax({
            url: "/victim/" + document.getElementById("victim_id").value + "/images",
            method: "DELETE",
            data:{
                date
            },
            success: function(response){

                table_images.ajax.reload(null, false)

                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red">Delete failed</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white">Delete success</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }
               
            }

        })
    })

    document.getElementById("no").addEventListener("click", () =>{
        Swal.close()
    })
})

$(document).ready(function () {
    table_music = $('#music').DataTable({
        ajax:{
            url: "/victim/music",
            method: "POST",
            data:{
                id: document.getElementById("victim_id").value
            },
            dataSrc: ""
        },
        columns:[
            {data: "id"},
            {defaultContent: '<button class="btn btn-success view_music"><i class="fas fa-eye"></i></button>     <button class="btn btn-danger delete_music"><i class="fas fa-trash-alt"></i></button>'}
        ],
        lengthMenu: [[10, 100, 1000, -1], [10, 100, 1000, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search:",
        },
        dom: "lBfrtip",
        buttons:[
            {
                text: '<i class="fas fa-sync-alt"></i>',
                className: "btn btn-primary recargar",
                action: function(){
                    table_music.ajax.reload(null, false)
                },
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
            {
                text: '<i class="fas fa-file-excel"></i>',
                extend: 'excelHtml5',
                className: "btn btn-success",
                autoFilter: true,
                sheetName: 'Exported data',
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
        ]
    });
});

$(document).on("click", ".view_music", function(){

    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    window.location.href = "/victim/" + document.getElementById("victim_id").value + "/music/" + date + "/files"

})

$(document).on("click", ".delete_music", function (){
    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    Swal.fire({
        icon: "question",
        html: '<h2 style="color: white;">Do you want delete this date?</h2>'+
        '<h3 style="color: white;">'+date+'</h3>'+
        '<button style="margin: 10px;" id="yes" class="btn btn-success">Yes</button>'+
        '<button style="margin: 10px;" id="no" class="btn btn-danger">No</button>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })

    document.getElementById("yes").addEventListener("click", () =>{
        $.ajax({
            url: "/victim/" + document.getElementById("victim_id").value + "/music",
            method: "DELETE",
            data:{
                date
            },
            success: function(response){

                table_music.ajax.reload(null, false)

                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red">Delete failed</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white">Delete success</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }
               
            }

        })
    })

    document.getElementById("no").addEventListener("click", () =>{
        Swal.close()
    })
})

$(document).ready(function () {
    table_videos = $('#videos').DataTable({
        ajax:{
            url: "/victim/videos",
            method: "POST",
            data:{
                id: document.getElementById("victim_id").value
            },
            dataSrc: ""
        },
        columns:[
            {data: "id"},
            {defaultContent: '<button class="btn btn-success view_videos"><i class="fas fa-eye"></i></button>     <button class="btn btn-danger delete_videos"><i class="fas fa-trash-alt"></i></button>'}
        ],
        lengthMenu: [[10, 100, 1000, -1], [10, 100, 1000, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search:",
        },
        dom: "lBfrtip",
        buttons:[
            {
                text: '<i class="fas fa-sync-alt"></i>',
                className: "btn btn-primary recargar",
                action: function(){
                    table_videos.ajax.reload(null, false)
                },
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
            {
                text: '<i class="fas fa-file-excel"></i>',
                extend: 'excelHtml5',
                className: "btn btn-success",
                autoFilter: true,
                sheetName: 'Exported data',
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
        ]
    });
});

$(document).on("click", ".view_videos", function(){

    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    window.location.href = "/victim/" + document.getElementById("victim_id").value + "/videos/" + date + "/files"

})

$(document).on("click", ".delete_videos", function (){
    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    Swal.fire({
        icon: "question",
        html: '<h2 style="color: white;">Do you want delete this date?</h2>'+
        '<h3 style="color: white;">'+date+'</h3>'+
        '<button style="margin: 10px;" id="yes" class="btn btn-success">Yes</button>'+
        '<button style="margin: 10px;" id="no" class="btn btn-danger">No</button>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })

    document.getElementById("yes").addEventListener("click", () =>{
        $.ajax({
            url: "/victim/" + document.getElementById("victim_id").value + "/videos",
            method: "DELETE",
            data:{
                date
            },
            success: function(response){

                table_videos.ajax.reload(null, false)

                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red">Delete failed</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white">Delete success</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }
               
            }

        })
    })

    document.getElementById("no").addEventListener("click", () =>{
        Swal.close()
    })
})

$(document).ready(function () {
    table_desktop = $('#desktop').DataTable({
        ajax:{
            url: "/victim/desktop",
            method: "POST",
            data:{
                id: document.getElementById("victim_id").value
            },
            dataSrc: ""
        },
        columns:[
            {data: "id"},
            {defaultContent: '<button class="btn btn-success view_desktop"><i class="fas fa-eye"></i></button>     <button class="btn btn-danger delete_desktop"><i class="fas fa-trash-alt"></i></button>'}
        ],
        lengthMenu: [[10, 100, 1000, -1], [10, 100, 1000, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search:",
        },
        dom: "lBfrtip",
        buttons:[
            {
                text: '<i class="fas fa-sync-alt"></i>',
                className: "btn btn-primary recargar",
                action: function(){
                    table_desktop.ajax.reload(null, false)
                },
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
            {
                text: '<i class="fas fa-file-excel"></i>',
                extend: 'excelHtml5',
                className: "btn btn-success",
                autoFilter: true,
                sheetName: 'Exported data',
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
        ]
    });
});


$(document).on("click", ".view_desktop", function(){

    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    window.location.href = "/victim/" + document.getElementById("victim_id").value + "/desktop/" + date + "/files"

})


$(document).on("click", ".delete_desktop", function (){
    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    Swal.fire({
        icon: "question",
        html: '<h2 style="color: white;">Do you want delete this date?</h2>'+
        '<h3 style="color: white;">'+date+'</h3>'+
        '<button style="margin: 10px;" id="yes" class="btn btn-success">Yes</button>'+
        '<button style="margin: 10px;" id="no" class="btn btn-danger">No</button>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })

    document.getElementById("yes").addEventListener("click", () =>{
        $.ajax({
            url: "/victim/" + document.getElementById("victim_id").value + "/desktop",
            method: "DELETE",
            data:{
                date
            },
            success: function(response){

                table_desktop.ajax.reload(null, false)

                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red">Delete failed</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white">Delete success</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }
               
            }

        })
    })

    document.getElementById("no").addEventListener("click", () =>{
        Swal.close()
    })
})


$(document).ready(function () {
    table_downloads = $('#downloads').DataTable({
        ajax:{
            url: "/victim/downloads",
            method: "POST",
            data:{
                id: document.getElementById("victim_id").value
            },
            dataSrc: ""
        },
        columns:[
            {data: "id"},
            {defaultContent: '<button class="btn btn-success view_downloads"><i class="fas fa-eye"></i></button>     <button class="btn btn-danger delete_downloads"><i class="fas fa-trash-alt"></i></button>'}
        ],
        lengthMenu: [[10, 100, 1000, -1], [10, 100, 1000, "All"]],
        responsive: true,
        language: {
            search: "_INPUT_",
            searchPlaceholder: "Search:"
        },
        dom: "lBfrtip",
        buttons:[
            {
                text: '<i class="fas fa-sync-alt"></i>',
                className: "btn btn-primary recargar",
                action: function(){
                    table_downloads.ajax.reload(null, false)
                },
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
            {
                text: '<i class="fas fa-file-excel"></i>',
                extend: 'excelHtml5',
                className: "btn btn-success",
                autoFilter: true,
                sheetName: 'Exported data',
                init: function(api, node, config){
                    $(node).removeClass("dt-button")
                }
            },
        ]
    });
});


$(document).on("click", ".view_downloads", function(){

    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    window.location.href = "/victim/" + document.getElementById("victim_id").value + "/downloads/" + date + "/files"

})

$(document).on("click", ".delete_downloads", function (){
    fila = $(this).closest("tr")
    date = fila.find('td').eq(0).text()

    Swal.fire({
        icon: "question",
        html: '<h2 style="color: white;">Do you want delete this date?</h2>'+
        '<h3 style="color: white;">'+date+'</h3>'+
        '<button style="margin: 10px;" id="yes" class="btn btn-success">Yes</button>'+
        '<button style="margin: 10px;" id="no" class="btn btn-danger">No</button>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })

    document.getElementById("yes").addEventListener("click", () =>{
        $.ajax({
            url: "/victim/" + document.getElementById("victim_id").value + "/downloads",
            method: "DELETE",
            data:{
                date
            },
            success: function(response){

                table_downloads.ajax.reload(null, false)

                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red">Delete failed</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white">Delete success</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }
               
            }

        })
    })

    document.getElementById("no").addEventListener("click", () =>{
        Swal.close()
    })
})
