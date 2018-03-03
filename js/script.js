let counter = 0,
    cardArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    matches = 0,
    gameStats = {
        rating: 1,
        time: '00:00',
        clicks: 0,
        score: 1
    };


const reset = function () {
    // remove .flipped class from all the cards
    // reset the board by randomizing the array cardArray.sort(function() { return 0.5 - Math.random() });
    // placeCards();
    // reset timer
    // reset rating
}

const placeCards = function () {
    // create fragment
    // a loop that places each card on the board by the order of the array
    // remove existing cards
    // add fragment to body
}

const updateGameStats = function () {
    // update game stats
};

/*Buttons*/

$('.reset-button').on('click', function () {
    reset();
});

$('.highscore-button').on('click', function () {
    // open highscore div
});

$('.back-button').on('click', function () {
    // close highscore div
});

$('.pull-down').on('click', function () {
    // toggle .submenu-open class on .sebmenu
});



/*reset popup*/

$('.reset-approve').on('click', function () {
    // close popup
    // reset();
});

$('.winner-approve').on('click', function () {
    // close winner popup
    // open highscore
    // reset();
});

$('.reset-cancel').on('click', function () {
    // close popup
});

/*input player name*/

$('#player-name-input').on('update', function () {
    //update gameStats with new value for name
});

/*card interaction*/

$('.card').on('click', function () {
    this.classList.toggle("flipped");
    // toggle .flipped class on card
    // add 1 click to counter
    // modify counter
    // determine star rating by evaluating counter
    // modify star rating
    // evaluate cards
    // if cards match add class complete and remove flipped, add 1 to let matches
    // else remove flipped class from cards
    // if all cards are matched (matches === 6)
    // stop timer
    // updateGameStats();
    // calculate score based on time and number of clicks
    // save gameStats to a new local storage
    // add gameStats to leader board
    // display popup of success with leaderboard
});
