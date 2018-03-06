let cardArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6],
    matches = 0,
    cardData = '',
    cardId = 13,
    score = 0,
    fragment = document.createDocumentFragment(),
    gameStats = {
        playerName: '',
        rating: 1,
        timer: '00:00',
        clicks: 0,
        score: 1
    };

const gameReset = function () {
    // reset the board by randomizing the array
    // cardArray.sort(function () {return 0.5 - Math.random()});
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
    $('.cards-container').append(fragment); // reset timer
    // reset rating and matches
    matches = 0;
    $('.rating').removeClass('rating-2-3 rating-1-3');
    // hide all popups
    $('.full-screen').fadeOut(0);

}

const updateGameStats = function () {
    // update game stats
};

/*Initial game reset*/

gameReset();

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
    $('.sub-menu').toggleClass('sub-menu-open')
});

/*reset popup*/

$('.reset-approve').on('click', function () {
    reset();
});

$('.cancel-button').on('click', function () {
    // close popup
    $(this).closest('.popup-container').fadeOut(0);

});

$('#winner-approve').on('click', function () {
    $('.winner').addClass('display-none');
    gameStats.playerName = $('#playerName').val();
    localStorage.setItem(gameStats.playerName, gameStats.score);
    gameReset();
    $('.highscore').fadeIn(0);
});

/*input player name*/

$('#player-name-input').on('update', function () {
    //update gameStats with new value for name
});

/*card interaction*/

$(document).on('click', '.card', function () {
    // toggle .flipped class on card
    this.classList.toggle("flipped");
    // add 1 click to clicks
    gameStats.clicks++;
    // determine star rating by evaluating clicks
    if (gameStats.clicks > 14 && gameStats.clicks < 20) {
        $('.rating').addClass('rating-2-3');
        gameStats.rating = 2;
    } else if (gameStats.clicks >= 20) {
        $('.rating').addClass('rating-1-3');
        gameStats.rating = 3;
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

        // stop timer
        // update score
        gameStats.score = gameStats.timer * gameStats.clicks;
        // display popup of success
        setTimeout(function () {
            $('.winner').removeClass('display-none');
        }, 500);
    }
});

/*timer*/

var stopwatch = function (my_element_id) {
    var $time = document.getElementById('timer')
    if (!$time) return

    var api = {}
    var duration = 1000
    var time = 0
    var clocktimer
    var h, m, s, ms

    function pad(num, size) {
        var s = "0000" + String(num)
        return s.substr(s.length - size)
    }

    function formatTime() {
        time += duration
        h = Math.floor(time / (60 * 60 * 1000))
        m = Math.floor(time / (60 * 1000) % 60)
        s = Math.floor(time / 1000 % 60)
        ms = time % 1000 / 10
        return pad(m, 2) + ':' + pad(s, 2)
    }

    function update() {
        $time.innerHTML = formatTime()
    }

    api.start = function () {
        clocktimer = setInterval(update, duration)
    }

    api.stop = function () {
        clearInterval(clocktimer)
    }

    api.formatTime = formatTime

    return api
}

var my_stopwatch = stopwatch('stopwatch');
my_stopwatch.start();
