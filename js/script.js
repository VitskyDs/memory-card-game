let cardArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    matches = 0,
    cardData = '',
    cardId = 13,
    fragment = document.createDocumentFragment(),
    gameStats = {
        rating: 1,
        time: '00:00',
        clicks: 0,
        score: 1
    };

const reset = function () {
    // reset the board by randomizing the array
    cardArray.sort(function () {return 0.5 - Math.random()});
    placeCards();
    // reset timer
    // reset rating
    // hide all popups
    $('.highscore').fadeOut(0);
    $('.reset').fadeOut(0);

}

const placeCards = function () {
    for (let i = 0; i < 12; i++) {
        const newCard = document.createElement('div');
        newCard.classList.add('card');
        newCard.classList.add('card-' + cardArray[i]);
        $(newCard).attr('id', i);
        $(newCard).attr('data', 'card-' + cardArray[i]);
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
    $('.reset').fadeIn(0);
    $('.pull-down').toggleClass('down');
    $('.sub-menu').removeClass('sub-menu-open');
});

$('.highscore-button, .back-button').on('click', function () {
    $('.highscore').fadeToggle(0);
    $('.sub-menu').removeClass('sub-menu-open');
});

$('.pull-down').on('click', function () {
    $('.pull-down').toggleClass('down');
    $('.sub-menu').parent().toggleClass('sub-menu-open')
});

/*reset popup*/

$('.reset-approve').on('click', function () {
    reset();
});

$('.winner-approve').on('click', function () {
    // close winner popup
    // open highscore
    // reset();
});

$('.cancel-button').on('click', function () {
    // close popup
    $(this).closest('.popup-container').fadeOut(0);

});

/*input player name*/

$('#player-name-input').on('update', function () {
    //update gameStats with new value for name
});

/*card interaction*/

$('.card').on('click', function () {
    // toggle .flipped class on card
    this.classList.toggle("flipped");
    // add 1 click to clicks
    gameStats.clicks++;
    // determine star rating by evaluating clicks
    if (gameStats.clicks > 14 && gameStats.clicks < 20) {
        $('.rating').addClass('rating-2-3');
    } else if (gameStats.clicks >= 20) {
        $('.rating').addClass('rating-1-3');
    }
    // evaluate cards
    if (cardData === $(this).attr('data') && cardId != $(this).attr('id')) {
        $('*[data=' + cardData + ']').addClass('done');
        cardData = '';
        matches++;
        cardId = $(this).attr('id');
        console.log(cardId);
        console.log(matches);
    } else if (gameStats.clicks % 2 === 0) {
        setTimeout(function () {
            $('.card').removeClass('flipped');
        }, 1000);
        cardData = '';
        cardId = $(this).attr('id');
    } else {
        cardData = $(this).attr('data');
        cardId = $(this).attr('id');
    }

    //
    if (matches === 6) {

    }
    // if all cards are matched (matches === 6)
    // stop timer
    // updateGameStats();
    // calculate score based on time and number of clicks
    // save gameStats to a new local storage
    // add gameStats to leader board
    // display popup of success with leaderboard
});
