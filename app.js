const search = document.getElementById("search");
const inputValue = document.getElementById("input");
const players_container = document.getElementById("players-container");
const card_container = document.getElementById("card-container");

search.addEventListener('click', () => {
    finding(inputValue.value);
});

const default_player = () => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=default`)
        .then(res => res.json())
        .then(data => {
            if (data && data.player) {
                display(data.player);
            }
        })
        .catch(error => console.error('Error fetching default player:', error));
};
default_player();

const finding = (value) => {
    fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${value}`)
        .then(res => res.json())
        .then(data => {
            if (data && data.player) {
                display(data.player);
            } else {
                players_container.innerHTML = "";
                players_container.innerHTML = `<p>No data Found</p>`;
            }
        })
        .catch(error => console.error('Error fetching player:', error));
};

let count = 0;
const display = (players) => {
    players_container.innerHTML = "";

    players.forEach(player => {
        const div = document.createElement("div");
        div.innerHTML = `
            <img src="${player.strThumb}" alt="Player Image"/>
            <h4>About</h4>
            <ul>
                <li>${player.strPlayer}</li>
                <li>${player.strNationality}</li>
                <li>${player.strNumber}</li>
                <li>${player.strTeam}</li>
                <li>${player.strHeight}</li>
                <li>${player.strWeight}</li>
            </ul>
            <button onclick="showDetails('${player.strThumb}', '${player.strPlayer}', '${player.strNationality}', '${player.strHeight}', '${player.strWeight}')">Details</button>
            <button onclick="add_cart('${player.strPlayer}', '${player.strThumb}')">Add to cart</button>
        `;
        div.classList.add('player');
        players_container.appendChild(div);
    });
};

const showDetails = (photo, name, nationality, height, weight) => {
    alert(`Player Name: ${name}\nHeight: ${height}\nWeight: ${weight}\nNationality: ${nationality}`);
};

const add_cart = (nam, photo) => {
    if (count == 11) {
        alert("Sorry, you can't add more!");
    } else {
        const div = document.createElement('div');
        div.innerHTML = `
            <img src="${photo}" alt="Player Image"/>
            <h3>Player Name: ${nam}</h3>
        `;
        count += 1;
        document.querySelector('span').innerText = count;
        card_container.appendChild(div);
    }
};
