document.addEventListener("DOMContentLoaded", function() {
    var backendURL = ''; 
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
