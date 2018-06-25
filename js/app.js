

// ***************** VARIABLES *********************************************************
// *************************************************************************************    
   let moveCount = 0;
    let timer = {
        seconds: 0,
        minutes: 0
    };
    let sec = 0;
    let timePassed;
    
    
    let starsArray=
        document.getElementsByClassName("fa-star");    
    let starRating;

    let cardsMatched = [];
    let cardsOpen = [];
    let countMatched = 0;
        
    let cardsArray = ["fa-home","fa-home","fa-birthday-cake","fa-birthday-cake",
                      "fa-bell","fa-bell","fa-truck", "fa-truck", "fa-balance-scale", 
                      "fa-balance-scale", "fa-bicycle", "fa-bicycle", "fa-bomb", 
                      "fa-bomb","fa-university", "fa-university"];


// *************** FUNCTIONS ***********************************************************
// *************************************************************************************
 

// *************** CARDS FUNCTIONS *****************************************************

// SHUFFLE function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// LOAD_NEW_CARDS function - changes cards pictures after shuffle  
function loadNewCards () {
     cardsArray = shuffle(cardsArray);
     let i = 0;
       
     $.each($(".card i"), function (){
         $(this).attr("class", "fa " + cardsArray[i]);
         i++;
     });
} 


// NEW_GAME_Initialization function
let newGame = function() {
    moveCount = 0;
    timer = {
        seconds: 0,
        minutes: 0
    };
    sec = 0;
    cardsMatched = [];
    cardsOpen = [];
    countMatched = 0;
    
    stopTimer(timePassed);
    
    nulifyTimer();
    resetMoveCount();
    resetStars();
    loadNewCards();
    $(".card").attr("class", "card");
    startTimer();
};    


newGame();

 
// CARD_CLICK function_runs after the card is clicked 
let cardClick = function() { 
    
   if(checkClickValid( $(this) )){
        if (cardsOpen.length === 0) {
            openCard( $(this) );
            moveCount = moveCount + 1;
            updateMoveCount();
           
        } else if (cardsOpen.length === 1) {
            openCard( $(this) );
            moveCount = moveCount + 1;
            updateMoveCount();
                        
            if (checkIfMatched()) {
               setTimeout(cardsMatch, 400);
            } else {
               setTimeout(closeCard, 800); 
            }
        }
   }
};


// CARDS_MATCH function_adds class "match" for both open cards if they are identical
let cardsMatch = function() {
    cardsOpen.forEach(function(card){
        card.addClass("match");
        });
    cardsOpen = [];
    countMatched = countMatched + 2;
    starRating = countStars();
    if (countMatched === 16){
        
        showModal();
        /*alert("Congratulations! " + "You won the game!" + "\n" + "You did " + moveCount + " moves. " + "Your star rating is " + starRating + " of 3." + "\n" + "You finished the game in " + Number(timer.minutes) + " minutes" + " and " + Number(timer.seconds) + " seconds.");*/
        stopTimer();
        //newGame();
    }
};

// CHECK_IF_MATCHED function_compares two open cards if they are identical
function checkIfMatched() {
   if (cardsOpen[0].children().attr("class") === cardsOpen[1].children().attr("class")) {
       return true;
   } else {
       return false;
   }     
} 

// CHECK CLICK VALID function_enables to click only at the closed card
function checkClickValid(card){
    if (card.hasClass("open") || card.hasClass("match")){ 
        return false;
    } else {
        return true;
    }
}
  
// OPEN CARD function_opens the closed cards
function openCard(card) {
     if(!card.hasClass("open")) {
        card.addClass("open");
        card.addClass("show");
        cardsOpen.push(card);
     }
}   
  
// CLOSE CARD function_closes cards if they do not match
var closeCard = function ()  {  
    cardsOpen.forEach(function(card){
        card.toggleClass("open");
        card.toggleClass("show");
        });
    cardsOpen = [];
 };
  
 
// *************** TIMER FUNCTIONS *****************************************************

// START_TIMER function_starts time measuring with every new game start             
function startTimer(){ 
    timePassed = setInterval (function(){
if(countMatched<16)  {      
    document.getElementById("seconds").innerHTML = "00";
    document.getElementById("minutes").innerHTML = "00";    
    timer.seconds = calcSeconds(++sec%60);  
    timer.minutes = calcSeconds(parseInt(sec/60,10));
    document.getElementById("seconds").innerHTML = timer.seconds;
    document.getElementById("minutes").innerHTML = calcSeconds(parseInt(sec/60,10));
    } else clearInterval(timePassed)},1000);
}
    
function calcSeconds (val) { 
   return val>9 ? val: "0" + val; 
}

// STOP_TIMER function_stops time measuring   
function stopTimer(){ 
    clearInterval(timePassed);
    document.getElementById("minutes").innerHTML = timer.minutes;
    document.getElementById("seconds").innerHTML = timer.seconds;
     
    sec=0;
   
}

// NULIFY_TIMER function_sets HTML time to "0"
function nulifyTimer(){ 
   document.getElementById("seconds").innerHTML = "00";
   document.getElementById("minutes").innerHTML = "00";
}

// *************** MOVEs FUNCTIONS *****************************************************

// RESET_MOVE_COUNT function_sets HTML moves to "0"
function resetMoveCount(){ 
    let moves = document.getElementsByClassName("moves");
    moves[0].innerHTML=0;
}

// UPDATE_MOVE_COUNT function_after each click updates HTML moves
function updateMoveCount() { 
    let moves = document.getElementsByClassName("moves");
    moves[0].innerHTML=moveCount;
    deleteStars();
}

// *************** STARs functions *****************************************************

// RESET_STARS function_sets the color of all stars back to black
function resetStars(){ 
    for(let i = 0; i<starsArray.length; i++){ 
    starsArray[i].style.color= "black";
    }
}

// DELETE_STARS function_changes color of two last stars to grey after move count is over limit
function deleteStars(){ 
    let thirdStar = starsArray[2];
    let secondStar = starsArray[1];
    
    if(moveCount>18){
        thirdStar.style.color= "lightgrey";
    }  
        if(moveCount>28){
        secondStar.style.color= "lightgrey";
        } 
}

// COUNT_STARS function_calculates star rating from 1 to 3 based on moveCount 
function countStars(){ 
    if(moveCount > 28){ 
        return 1;
    } else if (moveCount > 18) { 
        return 2;  
    } else {
        return 3;
    }
}

// MODAL function_opens pop-up window that shows the statistics
function showModal() { 

}

/****************** MODAL WINDOW  *********************/
/******************************************************/

// (source https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal2)

// Get the modal
var modal = document.getElementById('myModal');


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
function showModal() {
    modal.style.display = "block";
    document.getElementById("points").innerHTML = moveCount;
    document.getElementById("min").innerHTML=timer.minutes;
    document.getElementById("sec").innerHTML=timer.seconds;
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};


// *************** EVENT LISTENERS******************************************************
// *************************************************************************************

// ON RESTART click_starts new game, resets all counters, all cards closed
$(".restart").click(newGame);


// ON CARD CLICK_enables click on closed card
$(".card").click(cardClick);

