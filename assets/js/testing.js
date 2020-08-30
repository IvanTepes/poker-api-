

let data = $.ajax({ // Fetch api (deck) cards
    async: false,
    url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=52',
    type: 'get',
    data: { 'GetConfig': 'YES' },
    dataType: "JSON"
}).responseJSON;

let deck = data.cards; // deck cards from api

let gameStates = { // Game state 
    uninitialized: 0, 
    firstDeal: 1,
    secondDeal: 2,
    handLost: 3,
    handWon: 4,
    gameOver: 5,
    double: 6,
    saveScore: 7
}

let gameState = gameStates.uninitialized; // Initial game state
let startCredits = 10000; // Number of starting credits
let credits = startCredits; // Number of current credits
let currentBet = 100; // Amount of bet
let winID = -1; // Winning ID of prize if Hand is winning
let prizeWinThread; // Interval function handling combination on winning Hand

function newGame() { // Start a new game
    credits = startCredits;
    gameState = gameStates.gameOver;
    updateCreditsValue();
    updateBetValue();
}

function updateCreditsValue() { // Updating Credits
    document.getElementById('credits').innerHTML = credits;
}


function bet(action) {
    if ( gameState !== gameStates.firstDeal &&
         gameState !== gameStates.handWon &&
         gameState !== gameStates.handLost &&
         gameState !== gameStates.double)
        return; // Only allow bet before being dealt

    if (action === 'DOWN') { // Bet down requested
        if ( currentBet > 100) { // Govern minimum bet
             currentBet -= 100; // Decrement bet
            /* GameAudio.Play('BetDown'); */
        }
    }
    else if (action === 'UP') { // Bet up requested
        if ( currentBet && currentBet < credits) { // Govern maximum bet
             currentBet += 100; // Increment bet
            /* GameAudio.Play('BetUp'); */
        }
    }
    updateBetValue();
    updateCreditsValue();
}

// Betting active or inactive 
function updateBetValue() {
    if (gameState === gameStates.firstDeal || gameState === gameStates.handWon || gameState == gameStates.handLost || gameState == gameStates.save) // Betting buttons lit up and active
        document.getElementById("bet-down").classList.add = document.getElementById("bet-up").classList.add = "bet-buttons";
    else if (gameState === gameStates.gecondDeal || gameState === gameStates.gameOver) // Betting buttons subdued and inactive
    
        document.getElementById("bet-down").classList.add = document.getElementById("bet-up").classList.add = "button-bet-off";

    document.getElementById('bet-counter').innerHTML = currentBet;
}



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

