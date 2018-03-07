let cardArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    matches = 0,
    cardData = '',
    cardId = 13,
    score = 0,
    fragment = document.createDocumentFragment(),
    gameStats = {
        playerName: '',
        rating: 1,
        timer: '',
        clicks: 0,
        score: 1
    };

const rating = document.getElementById('rating'),
    highscore = document.getElementById('highscore'),
    reset = document.getElementById('reset'),
    pullDown = document.getElementById('pull-down'),
    winner = document.getElementById('winner'),
    subMenu = document.getElementById('sub-menu'),
    cardsContainer = document.getElementById('cards-container'),
    card = document.getElementsByClassName('card'),
    resetButton = document.getElementsByClassName('reset-button'),
    clock = $('#timer').timer({
        format: '%M:%S'
    });

/*Buttons*/

$(resetButton).on('click', function () {
    $('.reset').fadeIn(0);
    subMenu.classList.remove('sub-menu-open');
});

$('.highscore-button, .back-button').on('click', function () {
    $('.highscore').fadeToggle(0);
    subMenu.classList.remove('sub-menu-open');
});

pullDown.addEventListener('click', function () {
    subMenu.classList.toggle('sub-menu-open');
});

/*reset popup*/

$('.reset-approve').on('click', function () {
    gameReset();
});

$('.cancel-button').on('click', function () {
    $(this).closest('.popup-container').fadeOut(0);
});

$('#winner-approve').on('click', function () {
    winner.classList.add('display-none');
    gameStats.playerName = $('#playerName').val();
    localStorage.setItem('score', gameStats.score);
    localStorage.setItem('player', gameStats.playerName);
    // use local storage add rows to highscore
    document.querySelector('ul').insertAdjacentHTML('afterbegin', '<li><span class="player">' + localStorage.getItem('player') + '</span><span class="score">' + localStorage.getItem('score') + '</span></li>');
    gameReset();
    $('.highscore').fadeIn(0);
});

/*input player name*/
$('#player-name-input').on('update', function () {
    //update gameStats with new value for name
});

/*game reset*/
const gameReset = function () {
    // reset the board by randomizing the array
    /*    cardArray.sort(function () {
            return 0.5 - Math.random()
        });*/
    for (let i = 0; i < 12; i++) {
        const newCard = document.createElement('div');
        newCard.classList.add('card', 'card-' + cardArray[i]);
        $(newCard).attr('id', i);
        $(newCard).attr('data', 'card-' + cardArray[i]);
        newCard.innerHTML = '<div class="side-a"></div><div class="side-b"></div>';
        fragment.appendChild(newCard);
    }
    cardsContainer.innerHTML = '';
    cardsContainer.append(fragment); // reset timer
    // reset rating, matches and timer
    matches = 5;
    rating.classList.remove('rating-2-3', 'rating-1-3');
    clock.timer('remove');
    clock.timer({
        format: '%M:%S'
    });
    clock.timer('pause');
    gameStats.clicks = 0;
    gameStats.rating = 1;
    cardData = '';
    cardId = 13;
    // hide all popups
    $('.full-screen').fadeOut(0);
}

/*Initial game reset*/

gameReset();

/*card interaction*/

$(document).on('click', '.card', function () {
    clock.timer('resume');
    // toggle .flipped class on card
    this.classList.toggle("flipped");
    // add 1 click to every 2 clicks
    gameStats.clicks++;
    // determine star rating by evaluating clicks
    if (gameStats.clicks > 14 && gameStats.clicks < 20) {
        rating.classList.add('rating-2-3');
        gameStats.rating = 2;
    } else if (gameStats.clicks >= 20) {
        rating.classList.remove('rating-2-3');
        rating.classList.add('rating-1-3');
        gameStats.rating = 3;
    }
    // evaluate cards
    if (cardData === $(this).attr('data') && cardId != $(this).attr('id')) {
        $('*[data=' + cardData + ']').addClass('done');
        //document.querySelector('*[data=' + cardData + ']').classList.add('done');
        cardData = '';
        matches++;
        cardId = $(this).attr('id');
        console.log(cardId);
        console.log(matches);
    } else if (gameStats.clicks % 2 === 0) {
        setTimeout(function () {
            $(card).removeClass('flipped');
        }, 900);
        cardData = '';
        cardId = $(this).attr('id');
    } else {
        cardData = $(this).attr('data');
        cardId = $(this).attr('id');
    }
    // evaluate number of succesful matches
    if (matches === 6) {
        clock.timer('pause');
        gameStats.clicks = gameStats.clicks / 2;
        gameStats.timer = clock.data('seconds');;
        // update score
        gameStats.score = 1000 - gameStats.timer * gameStats.clicks / gameStats.rating;
        // display popup of success
        setTimeout(function () {
            winner.classList.remove('display-none');
        }, 500);
    }
});
