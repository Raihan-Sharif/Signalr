

$(() => {
    var connection = new signalR.HubConnectionBuilder().withUrl("signalrServer").build();
    connection.start().then(() => console.log("Connection Start"));
    connection.on("LoadProducts", function (data) {
        var tr = '';
        console.log('connection on', data);
        $.each(data, (k, v) => {
            tr += `<tr>
                                <td> ${v.name}</td>
                                <td> ${v.quantity}</td>
                                <td> ${v.price}</td>
                                <td> ${v.isAvailable}</td>
                                <td>\
                                    <a href="../Products/Edit/${v.id}">Edit</a>|\
                                    <a href="../Products/Details/${v.id}">Details</a>|\
                                    <a href="../Products/Delete/${v.id}">Delete</a>\
                                </td >\
                          </tr>`
        })
        //console.log('tr', tr);
        $('#tblProductBody').html(tr);
        //loadProductData();
    });

    loadProductData();

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