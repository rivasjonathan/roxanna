$(document).ready(function (){
    table_documents = $('#documents').DataTable({
        ajax:{
            url: "/victim/documents/date/files",
            method: "POST",
            data:{
                id: document.getElementById("victim_id").value,
                date: document.getElementById("date_id").value
            },
            dataSrc: ""
        },
        columns:[
            {data: "id"},
            {data: "name"},
            {data: "date"},
            {data: "size"},
            {defaultContent: '<button class="btn btn-warning edit"><i class="fas fa-pencil-alt"></i></button>   <button class="btn btn-danger delete"><i class="fas fa-trash-alt"></i></button>'}
        ],
        lengthMenu: [[20, 100, 1000, -1], [20, 100, 1000, "All"]],
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
    })

})


$(document).on("click", ".edit", function(){

    fila = $(this).closest("tr")
    id = fila.find('td').eq(0).text()
    nombre = fila.find('td').eq(1).text()
    date = fila.find('td').eq(2).text()
    size = fila.find('td').eq(3).text()

    Swal.fire({
        icon: "question",
        html: ''+
        '<form id="form" class="form">'+
            '<center>'+
                '<h2>'+id+'</h2>'+
            '</center>'+
            '<label for="name">Name:</label>'+
            '<input type="text" class="form-control" id="name" placeholder="Name:" required autocomplete="off" value="'+nombre+'">'+
            '<label for="date">Date:</label>'+
            '<input type="text" class="form-control" id="date" placeholder="Date:" required autocomplete="off" value="'+date+'">'+
            '<label for="size">Size:</label>'+
            '<input type="text" class="form-control" id="size" placeholder="Size:" required autocomplete="off" value="'+size+'">'+
            '<input type="submit" class="btn btn-success" value="Save">'+
        '</form>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })

    document.getElementById("form").addEventListener("submit", (e) =>{
        e.preventDefault()
        $.ajax({
            url: "/victim/edit",
            method: "PUT",
            data:{
                id: document.getElementById("victim_id").value,
                date: document.getElementById("date_id").value,
                uid: id,
                name: document.getElementById("name").value,
                size: document.getElementById("size").value,
                fecha: document.getElementById("date").value
            },
            success: function(response){
                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red;">Failed the change</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    table_documents.ajax.reload(null, false)
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white;">Success the change</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }
            }
        })
    })

})

$(document).on("click", ".delete", function(){

    fila = $(this).closest("tr")
    id = fila.find('td').eq(0).text()
    nombre = fila.find('td').eq(1).text()
    date = fila.find('td').eq(2).text()
    size = fila.find('td').eq(3).text()

    Swal.fire({
        icon: "question",
        html: ''+
        '<button class="btn btn-success" style="margin: 10px; width: 100px;" id="yes">Yes</button>'+
        '<button class="btn btn-danger"  style="margin: 10px; width: 100px;" id="no">No</button>',
        background: "rgba(0, 0, 0, .9)",
        showConfirmButton: false,
    })


    document.getElementById("yes").addEventListener("click", () =>{
        $.ajax({
            url: "/victim/delete",
            method: "DELETE",
            data:{
                id: document.getElementById("victim_id").value,
                date: document.getElementById("date_id").value,
                uid: id,
            },
            success: function(response){
                if(response == 0){
                    Swal.fire({
                        icon: "error",
                        html: '<h2 style="color: red;">Failed the change</h2>',
                        background: "rgba(0, 0, 0, .9)",
                        showConfirmButton: false,
                    })
                }else{
                    table_documents.ajax.reload(null, false)
                    Swal.fire({
                        icon: "success",
                        html: '<h2 style="color: white;">Success the change</h2>',
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