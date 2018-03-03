let counter = 0,
    cardArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    matches = 0,
    fragment = document.createDocumentFragment(),
    gameStats = {
        rating: 1,
        time: '00:00',
        clicks: 0,
        score: 1
    };

const reset = function () {
    // reset the board by randomizing the array
    cardArray.sort(function () {
        return 0.5 - Math.random()
    });
    placeCards();
    // reset timer
    // reset rating
}

const placeCards = function () {
    for (let i = 0; i < 12; i++) {
        const newCard = document.createElement('div');
        newCard.classList.add('card', 'card-'+cardArray[i]);
        newCard.innerHTML = '<div class="side-a"></div><div class="side-b"></div>';
        fragment.appendChild(newCard);
    }
    $('.cards-container').empty();
    $('.cards-container').append(fragment);
}

const updateGameStats = function () {
    // update game stats
};

/*Initial game reset*/

reset();

/*Buttons*/

$('.reset-button').on('click', function () {
    // open reset popup
});

$('.highscore-button').on('click', function () {
    // open highscore div
});

$('.back-button').on('click', function () {
    // close highscore div
});

$('.pull-down').on('click', function () {
    $(this).toggleClass('down');
    $(this).parent().toggleClass('sub-menu-open')
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
