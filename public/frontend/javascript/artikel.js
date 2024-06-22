document.addEventListener("DOMContentLoaded", function() {
    var backendURL = 'https://graphica.gajiin.my.id/'; 
    // Jika link yang tertampil di browser nya ini
    // https://graphica.gajiin.my.id/frontend/xxx
    // maka origin nya ini :
    // https://graphica.gajiin.my.id/
    const originUrl = window.location.origin;
    fetch(`${backendURL}/artikel/api/artikel`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                var artikelList = document.getElementById('artikel-list');
                data.data.forEach(artikel => {
                    var listItem = document.createElement('li');
                    listItem.classList.add('artikel');

                    var card = document.createElement('div');
                    card.classList.add('card');
                    card.innerHTML = `
                        <div class="card-title">${artikel.title}</div>
                        <div class="card-content" id="content-${artikel.id}">${artikel.content.substring(0, 100)}...</div>
                        <div class="card-actions">
                            <button class="button" onclick="showArticle(${artikel.id})">Read More</button>
                        </div>
                    `;
                    listItem.appendChild(card);
                    artikelList.appendChild(listItem);
                });
            }
        });
});
