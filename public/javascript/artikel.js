document.addEventListener("DOMContentLoaded", function() {
    var backendURL = 'http://localhost:3000/artikel'; 

    fetch(`${backendURL}/artikel`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                var artikelList = document.getElementById('artikel-list');
                data.data.forEach(artikel => {
                    var listItem = document.createElement('li');
                    listItem.textContent = `${artikel.title}: ${artikel.content}`;
                    artikelList.appendChild(listItem);
                });
            }
        });

    document.getElementById('create-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var title = document.getElementById('title').value;
        var content = document.getElementById('content').value;
        
        fetch(`${backendURL}/artikel/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                alert(data.success);
                location.reload(); 
            }
        });
    });
});
