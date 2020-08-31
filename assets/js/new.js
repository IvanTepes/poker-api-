
/* Main Menu Options Buttons*/
 $('.hold').click(function() {
     $(this).toggleClass("hold-active");
 });

$('.new-game-button').click(function() {
     $(".main-menu-screen").toggleClass("hidden");
 });

 $('.new-game-button').click(function() {
     $(".game-screen").removeClass("hidden").addClass('visible');
 });

 $('.in-game-menu-button').click(function() {
     $('.main-menu-screen').removeClass('hidden').addClass('visible');
 });

 $('.in-game-menu-button').click(function() {
     $('.main-menu-screen').removeClass('visible');
 });

 $('.settings-button').click(function() {
     $('.settings-menu-screen').removeClass('hidden');
 });

 $('.settings-main-menu-back-button').click(function() {
     $('.settings-menu-screen').addClass('hidden');
 });
 /* /main menu options buttons*/

/* Settings Menu Background selection */
 $('.setting-theme-green').on('click',function() {
    if($(".game-screen").hasClass("game-screen") || ("theme-yellow") || ("theme-red")) {
        $("#game").removeClass("game-screen").removeClass("theme-yellow").removeClass("theme-red").addClass("theme-green");
        $("#menu-container").removeClass("theme-red").removeClass("theme-yellow").removeClass("theme-red").addClass("theme-green");
        $("#settings-container").removeClass("theme-yellow").removeClass("theme-red").removeClass("theme-red").addClass("theme-green");
    }
});

$('.setting-theme-yellow').on('click',function() {
    if($(".game-screen").hasClass("game-screen") || ("theme-green") || ("theme-red")) {
        $("#game").removeClass("game-screen").removeClass("theme-green").removeClass("theme-red").addClass("theme-yellow");
        $("#menu-container").removeClass("theme-red").removeClass("theme-green").removeClass("theme-red").addClass("theme-yellow");
        $("#settings-container").removeClass("theme-red").removeClass("theme-green").removeClass("theme-red").addClass("theme-yellow");
    } 
});

$('.setting-theme-red').on('click',function() {
    if($(".game-screen").hasClass("game-screen") || ("theme-green") || ("theme-yellow")) {
        $("#game").removeClass("game-screen").removeClass("theme-green").removeClass("theme-yellow").addClass("theme-red");
        $("#menu-container").removeClass("theme-yellow").removeClass("theme-green").removeClass("theme-red").addClass("theme-red");
        $("#settings-container").removeClass("theme-yellow").removeClass("theme-green").removeClass("theme-red").addClass("theme-red");
    } 
});
/* /settings menu background selection */

/* Settings Menu Card Background Selection */
$('.settings-card-back-red').on('click',function() {
    if($(".card-face--front").hasClass("card-face--front") || ("card-theme-red") ||       
    ("card-theme-blue") || ("card-theme-black")) {
        $(".card-face--front").removeClass("card-theme-black").removeClass("card-theme-blue").removeClass("card-theme-red").addClass("card-theme-red");
    } 
});

$('.settings-card-back-blue').on('click',function() {
    if($(".card-face--front").hasClass("card-face--front") || ("card-theme-red") ||       
    ("card-theme-blue") || ("card-theme-black")) {
        $(".card-face--front").removeClass("card-theme-black").removeClass("card-theme-red").removeClass("card-theme-blue").addClass("card-theme-blue");
    } 
});

$('.settings-card-back-black').on('click',function() {
    if($(".card-face--front").hasClass("card-face--front") || ("card-theme-red") ||       
    ("card-theme-blue") || ("card-theme-black")) {
        $(".card-face--front").removeClass("card-theme-black").removeClass("card-theme-red").removeClass("card-theme-blue").addClass("card-theme-black");
    } 
});

/* /settings menu card background selection */

function flip() {
    $('.card').toggleClass('is-flipped');
};


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
    
    function deck(data) {
        let deck = data.cards;
        console.log(data);
        let card_array = new Array();
        var i=0;
        for (var cards = 0; cards < deck.length; cards++) {
            var currentObject = deck[cards]
            /* console.log(deck[cards]) */
            card_array[i] = deck[cards]
            i++;  
            console.log(card_array)
        }
    };
    getData(deck);
};

drawCards();

document.getElementById("hold-button-0").classList.add('hold'),
        document.getElementById("hold-button-1").classList.add('hold'),
        document.getElementById("hold-button-2").classList.add('hold'),
        document.getElementById("hold-button-3").classList.add('hold'),
        document.getElementById("hold-button-4").classList.add('hold')

        document.getElementById("hold-button-0").classList.add('hold-inactive'),
        document.getElementById("hold-button-1").classList.add('hold-inactive'),
        document.getElementById("hold-button-2").classList.add('hold-inactive'),
        document.getElementById("hold-button-3").classList.add('hold-inactive'),
        document.getElementById("hold-button-4").classList.add('hold-inactive')