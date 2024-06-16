function onPesananSubmit (event){
    event.preventDefault();

    const final = Object.fromEntries(new FormData(event.target).entries());
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/api/1234567890",
        data: JSON.stringify(final),
        contentType: "application/json",
        success: function (data) {
            console.log("success: " + data.message);

            location.reload();
        },
        error: function (xhr, status, error) {
            let errorCode = xhr.status;
            let errorText = xhr.statusText;
            let errorMessage = `<span><strong>Error ${errorCode}</strong>: ${errorText}</span>`;
            console.log(errorMessage);
            
        },
    });

    return false;
}