/* window.onload = function () {
    var card = document.querySelector('.card, .card');
    card.addEventListener('click', function () {
        card.classList.toggle('is-flipped');
    });
}
 */
/* window.onload = function () {
$('.card').on('click', function() {
    $(this).toggleClass('is-flipped');
})
} */

function flip() {
    $('.card').toggleClass('is-flipped');
}

// Draw cards images 
function drawCards() {
    // Get data 
    function getData(cb) {
        var xhr = new XMLHttpRequest();

        xhr.open("GET", "https://deckofcardsapi.com/api/deck/new/draw/?count=52");
        xhr.send();

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                cb(JSON.parse(this.responseText));
            }
        };
    }
    // Cards Data
    function selectCards(data) {

        let newDeck = data.cards;
        let firstDraw = newDeck.slice(0, 5);
        let cardValue;
        document.getElementById("card1").src = firstDraw[0].image;
        document.getElementById("card2").src = firstDraw[1].image;
        document.getElementById("card3").src = firstDraw[2].image;
        document.getElementById("card4").src = firstDraw[3].image;
        document.getElementById("card5").src = firstDraw[4].image;

       


        console.log(firstDraw)
        console.log(newDeck)
        console.log(cardValue)




        /* let cards = data.cards
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
        console.log(cards) */

    }
    getData(selectCards);
};

