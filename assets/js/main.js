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

/* Main Menu buttons*/

 $('.hold').click(function() {
     $(this).toggleClass("hold-active");
 });

$('.new-game-button').click(function() {
     $(".menu-container").toggleClass("hidden");
 });

 $('.new-game-button').click(function() {
     $(".game-screen").removeClass("hidden").addClass('visible');
 });




 $('.menu-button').click(function() {
     $('.menu-container').removeClass('hidden').addClass('visible');
 });

 $('.menu-button').click(function() {
     $('.menu-container').removeClass('visible');
 });

 /* $('.new-game-button').on('click',function() {
    if($("menu-container").hasClass("menu_hide")){
        $("#showname1").removeClass("menu_hide").addClass("menu_show");
        $("#showname2").removeClass("lockscreen_off").addClass("lockscreen_on");
    } else {
        $("#showname1").removeClass("menu_show").addClass("menu_hide");
        $("#showname2").removeClass("lockscreen_on").addClass("lockscreen_off");
    }
});
 */
 
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