
let data = $.ajax({ // Fetch api (deck) cards
    async: false,
    url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=52',
    type: 'get',
    data: { 'GetConfig': 'YES' },
    dataType: "JSON"
}).responseJSON;

let deck = data.cards; // deck cards from api

let gameStates = { // Game state 
    newGame: 0, 
    firstDeal: 1,
    secondDeal: 2,
    handLost: 3,
    handWon: 4,
    double: 5,
    gameOver: 6,
    saveScore: 7
}

let gameState = gameStates.newGame; // Initial game state
let startCredits = 11000; // Number of starting credits
let credits = startCredits; // Number of current credits
let currentBet = 100; // Amount of bet
let winID = -1; // Winning ID of prize if Hand is winning
let prizeWinThread; // Interval function handling combination on winning Hand

function startGame() { // Start a new game
    credits = startCredits;
    gameState = gameStates.handWon;
    updateCreditsValue();
    updateBetValue();
    updateHoldButtons();
    updateDoubleButton();
    updateSaveScoreButton();
    updateDealButton();
    updateInGameMenuButton();
};

// Updating Credits
function updateCreditsValue() { 
    document.getElementById('credits').innerHTML = credits;
};

// Bet action min-max bet
function bet(action) {
    if ( gameState !== gameStates.newGame &&
         gameState !== gameStates.firstDeal &&
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
// Find better way for classes clan
// Betting active or inactive 
function updateBetValue() {
    if (gameState === gameStates.newGame || gameState === gameStates.firstDeal) // Betting buttons lit up and active
            document.getElementById("bet-down").classList.add = document.getElementById("bet-up")   .classList.add = "bet-buttons";
    else if (gameState === gameStates.firstDeal || gameState === gameStates.secondDeal ||                 gameState === gameStates.handLost || gameState === gameStates.handWon || 
             gameState === gameStates.double || gameState === gameStates.gameOver)       
                document.getElementById("bet-down").classList.add('bet-inactive'),
                document.getElementById("bet-up").classList.add('bet-inactive'),
                document.getElementById("bet-down").classList.remove('bet-buttons'),
                document.getElementById("bet-up").classList.remove('bet-buttons');
        
    document.getElementById('bet-counter').innerHTML = currentBet;
};

// Try find better way for classes clean
// Hold buttons active or inactive
function updateHoldButtons() {
    // Hold Buttons active
    if (gameState === gameStates.secondDeal) 
            document.getElementById("hold-button-0").classList.add('hold'),
            document.getElementById("hold-button-1").classList.add('hold'),
            document.getElementById("hold-button-2").classList.add('hold'),
            document.getElementById("hold-button-3").classList.add('hold'),
            document.getElementById("hold-button-4").classList.add('hold');
    // Hold Buttons inactive
    else if (gameState === gameStates.newGame || gameState === gameStates.firstDeal || 
             gameState === gameStates.handWon || gameState === gameStates.handLost || 
             gameState === gameStates.double || gameState === gameStates.gameOver)
                document.getElementById("hold-button-0").classList.add('hold-inactive'),
                document.getElementById("hold-button-1").classList.add('hold-inactive'),
                document.getElementById("hold-button-2").classList.add('hold-inactive'),
                document.getElementById("hold-button-3").classList.add('hold-inactive'),
                document.getElementById("hold-button-4").classList.add('hold-inactive');
};

// Double Button active or inactive
// When game is in phase where is win and "Double bonus mini game is offered"
function updateDoubleButton() {
    // If hand is won button is active
    if (gameState === gameStates.handWon || gameState === gameStates.double) 
            document.getElementById("double-button").classList.add('double');
    // If not win continue inactive
    else if (gameState === gameStates.newGame || gameState === gameStates.firstDeal ||                    gameState === gameStates.secondDeal || gameState === gameStates.handLost || 
             gameState === gameStates.gameOver)
                document.getElementById("double-button").classList.add("double-inactive") 
};

// Save Score Button active or inactive
// When player can save his high score
function updateSaveScoreButton() {
    // if game state is New Game and Credit is more than 10000
    if (gameState === gameStates.newGame && credits > 10000 )
            document.getElementById("save-score").classList.add('save-button')
    // if not try harder
    else if (gameState === gameStates.newGame || gameState === gameStates.firstDeal || 
             gameState === gameStates.secondDeal || gameState === gameStates.handLost || gameState === gameStates.handWon || gameState === gameStates.double || 
             gameState === gameStates.gameOver && credits < 10000)
                document.getElementById("save-score").classList.add('save-inactive')
};

// Update Deal Button 
// When game is in phase 
// where player have choice
// try to double it or continue play
// Deal Button change from "DEAL" to "NEW DEAL"
function updateDealButton() {
    if (gameState === gameStates.handWon || gameState === gameStates.double || gameState ===         gameStates.handLost)
            document.getElementById("deal").innerHTML = 'NEW DEAL',
            document.getElementById("deal").classList.add('new-deal')
    else if (gameState === gameStates.newGame || gameState === gameStates.firstDeal || 
             gameState === gameStates.secondDeal || gameState === gameStates.gameOver);
};

// In Game Menu Button
// Player can't leave game in middle of hand
// Only before cards are fliped
function updateInGameMenuButton() {
    if (gameState === gameStates.newGame || gameState === gameStates.firstDeal)
            document.getElementById("game-menu").classList.remove('game-menu-inactive')
};

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

