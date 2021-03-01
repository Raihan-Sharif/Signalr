﻿

$(() => {
    var connection = new signalR.HubConnectionBuilder().withUrl("signalrServer").build();
    connection.start().then(() =>  loadProductData());
    connection.on("LoadProducts", function () {
        console.log('connection on');
        loadProductData();
    })

   // loadProductData();
    function loadProductData() {
        console.log('Load product');
        var tr = '';
        $.ajax({
            url: "/Products/GetProducts",
            method: 'Get',
            success: (result) => {
                $.each(result, (k, v) => {
                    tr += `<tr>
                                <td> ${v.Name}</td>
                                <td> ${v.Quantity}</td>
                                <td> ${v.Price}</td>
                                <td> ${v.IsAvailable}</td>
                                <td>\
                                    <a href="../Products/Edit/${v.Id}">Edit</a>|\
                                    <a href="../Products/Details/${v.Id}">Details</a>|\
                                    <a href="../Products/Delete/${v.Id}">Delete</a>\
                                </td >\
                          </tr>`
                })
                $('#tblProductBody').html(tr);
            },
            error: (error) => {
                console.log(error);
            }
        });
    }
}
)