function getData(cb) {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "https://deckofcardsapi.com/api/deck/new/draw/?count=5");
    xhr.send();

    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText));
        }
    };
}

function drawCards(data) {

    let cards = data.cards;
    let card1 = cards[0].image;
    let card2 = cards[1].image;
    let card3 = cards[2].image;
    let card4 = cards[3].image;
    let card5 = cards[4].image;
    document.getElementById("card1").src = card1,
    document.getElementById("card2").src = card2;
    document.getElementById("card3").src = card3;
    document.getElementById("card4").src = card4;
    document.getElementById("card5").src = card5;
    console.log(cards[0])
    
    
}

getData(drawCards);


