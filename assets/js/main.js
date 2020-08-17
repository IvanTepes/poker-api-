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

/* $(function(){
    $('.hold-card').on('click',function(){
       $(this).toggleClass('clicked');
    });
});
 */



 $('.hold').click(function() {
     $(this).toggleClass("hold-active");
 });

$('.card-face--front').click(function() {
     $(".hold").toggleClass("hold-active");
 });

 /////////////////////////////////////////////////////////////////////////////////////////
/* working script */

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

    }
    getData(selectCards);
    console.log(getData(selectCards))
};

/* /working script */