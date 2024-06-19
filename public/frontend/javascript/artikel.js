document.addEventListener("DOMContentLoaded", function() {
    var backendURL = 'http://localhost:3000'; 
    fetch(`${backendURL}/artikel/api/artikel`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                var artikelList = document.getElementById('artikel-list');
                data.data.forEach(artikel => {
                    var listItem = document.createElement('li');
                    listItem.classList.add('artikel')
                    listItem.textContent = `${artikel.title}: ${artikel.content}`;
                    artikelList.appendChild(listItem);
                });
            }
        }
    );
});

