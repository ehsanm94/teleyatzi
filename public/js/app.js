let user;
let TWA;

const rules = {
    ones: {
        title: 'Aces',
        description: 'Sum of all aces',
        dice: 'dice_1',
        side: 'upper'
    },
    twos: {
        title: 'Twos',
        description: 'Sum of all twos',
        dice: 'dice_2',
        side: 'upper'
    },
    threes: {
        title: 'Threes',
        description: 'Sum of all threes',
        dice: 'dice_3',
        side: 'upper'
    },
    fours: {
        title: 'Fours',
        description: 'Sum of all fours',
        dice: 'dice_4',
        side: 'upper'
    },
    fives: {
        title: 'Fives',
        description: 'Sum of all fives',
        dice: 'dice_5',
        side: 'upper'
    },
    sixes: {
        title: 'Sixes',
        description: 'Sum of all sixes',
        dice: 'dice_6',
        side: 'upper'
    },
    threeOfAKind: {
        title: 'Three Of a Kind',
        description: 'Sum of 3 identical dice',
        dice: 'dice_threeOfAKind',
        side: 'lower'
    },
    fourOfAKind: {
        title: 'four Of a Kind',
        description: 'Sum of 4 identical dice',
        dice: 'dice_fourOfAKind',
        side: 'lower'
    },
    fullHouse: {
        title: 'Full House',
        description: '2 and 3 dice of a kind',
        dice: 'dice_fullHouse',
        side: 'lower'
    },
    smallStraight: {
        title: 'Small Straight',
        description: 'Sequence of 4 dice',
        dice: 'dice_smallStraight',
        side: 'lower'
    },
    largeStraight: {
        title: 'Large Straight',
        description: 'Sequence of 5 dice',
        dice: 'dice_largeStraight',
        side: 'lower'
    },
    yatzy: {
        title: 'Yatzy',
        description: '5 of a kind',
        dice: 'dice_yatzy',
        side: 'lower'
    },
    chance: {
        title: 'Chance',
        description: 'Total of all 5 dice',
        dice: 'dice_chance',
        side: 'lower'
    }
};

const mainBtnHandlers = {
    newGame: {
        text: (appendTxt) => 'New Game' + appendTxt,
        handler: startGame
    },
    resumeGame: {
        text: (appendTxt) => 'Resume Game' + appendTxt,
        handler: resumeGame
    },
    roll: {
        text: (appendTxt) => 'Roll' + appendTxt,
        handler: startRolling
    }
};

$(document).ready(function () {
    TWA = window.Telegram.WebApp;

    $('#dice-loc-1').click(function () { toggleDiceLock(1); });
    $('#dice-loc-2').click(function () { toggleDiceLock(2); });
    $('#dice-loc-3').click(function () { toggleDiceLock(3); });
    $('#dice-loc-4').click(function () { toggleDiceLock(4); });
    $('#dice-loc-5').click(function () { toggleDiceLock(5); });

    initGameTable();
    initGame();
});

function postAjax (url, data) {
    return $.ajax({
        url,
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        type: 'POST'
    });
}

function updateMainButton (handlerId, isVisible, isActive = true, appendTxt = '') {
    const color = isActive ? TWA.themeParams.button_color : '#aaaaaa';
    TWA.MainButton
        .offClick(mainBtnHandlers.newGame.handler)
        .offClick(mainBtnHandlers.resumeGame.handler)
        .offClick(mainBtnHandlers.roll.handler)
        .onClick(mainBtnHandlers[handlerId].handler)
        .setParams({
            text: mainBtnHandlers[handlerId].text(appendTxt),
            color,
            is_visible: isVisible,
            is_active: isActive
        })
    ;
}

function initGame () {
    postAjax('/init', { initData: TWA.initData })
        .done(function (data) {
            // const { gameId, highScore, id, firstName, lastName, username, languageCode, allowWriteToPm } = data.data;
            user = data.data;

            // informs the Telegram app that the Mini App is ready to be displayed
            TWA.ready();

            updateMainButton(user.gameId ? 'resumeGame' : 'newGame', true, true);

            $('#username').html('@' + user.username);
            $('#highscore').html(user.highScore || 'NOTHING!');
        }).fail(function () {
            $('body').html('We have some error, please reload web app.');
        });
}

function finishGame () {
    TWA.showPopup({
        title: 'Close Game',
        message: 'Are you sure ?',
        buttons: [{
            id: 'continue',
            type: 'cancel',
            text: 'cancel'
        }, {
            id: 'pause',
            type: 'default',
            text: 'pause'
        }, {
            id: 'leave',
            type: 'default',
            text: 'leave'
        }]
    }, function (buttonId) {
        if (buttonId === 'leave') {
            postAjax('/games/leave', { userId: user.id, gameId: user.gameId })
                .done(function (data) {
                    if (data.ok) {
                        closeGame();
                    } else {
                        TWA.showAlert(data.message);
                    }
                }).fail(function () {
                    TWA.showAlert('please check your internet connection');
                });
        } else if (buttonId === 'pause') {
            closeGame();
        }
    });
}

function initGameTable () {
    let upperSectionHTML = '';
    let lowerSectionHTML = '';
    Object.keys(rules).forEach(function (ruleKey) {
        if (rules[ruleKey].side === 'upper') {
            upperSectionHTML += '<div class="row game-item"><div class="col-4" id="rule-description-' + ruleKey + '"><img src="images/' + rules[ruleKey].dice + '.svg"></div> <div class="col-8" id="' + ruleKey + '">  </div></div>';
        } else {
            lowerSectionHTML += '<div class="row game-item"><div class="col-4" id="rule-description-' + ruleKey + '"><img src="images/' + rules[ruleKey].dice + '.svg"></div> <div class="col-8" id="' + ruleKey + '">  </div></div>';
        }
    });
    upperSectionHTML += '<div class="row game-item last-item"><div class="col-4" id="rule-description-upperSectionBonus"><img src="images/dice_upperSectionBonus.svg"></div><div class="col-8" id="gift"><svg width="48" height="48" viewBox="0 0 160 160" class="progress-svg"><circle r="70" cx="80" cy="80" fill="transparent" stroke="#e0e0e0" stroke-width="12px"></circle><circle id="progress" r="70" cx="80" cy="80" fill="transparent" stroke="#198754" stroke-linecap="round" stroke-width="12px" stroke-dasharray="439.6px" stroke-dashoffset="1px"></circle></svg><span id="bounce"></span></div></div>';

    $('#upper-section').html(upperSectionHTML);
    $('#lower-section').html(lowerSectionHTML);

    setTimeout(function () {
        Object.keys(rules).forEach(function (ruleKey) {
            $('#rule-description-' + ruleKey).click(function () { showRuleDescription(ruleKey); });
        });
    }, 500);

    TWA.BackButton.onClick(finishGame);
}

function startRolling () {
    let currentDice;
    const lock = [];
    for (let i = 1; i < 6; i++) {
        currentDice = document.getElementById('dice-loc-' + i);
        if (currentDice && !currentDice.matches('.lock')) {
            lock.push(i - 1);
        }
    }
    const rolling = setInterval(function () {
        for (let i = 1; i < 6; i++) {
            currentDice = document.getElementById('dice-loc-' + i);
            if (currentDice && !currentDice.matches('.lock')) {
                currentDice.innerHTML = '<img src="images/dice_' + getRandomDieValue() + '.svg">';
            }
        }
    }, 150);

    postAjax('/games/roll', { gameId: user.gameId, userId: user.id, diceIndexes: lock })
        .done(function (data) {
            if (data.ok) {
                setupGame(data.data, rolling);
            } else {
                TWA.showAlert(data.message);
            };
        }).fail(function () {
            TWA.showAlert('please check your internet connection');
        });
}

function getRandomDieValue () {
    return Math.floor((Math.random() * 6) + 1);
}

function toggleDiceLock (id) {
    const currentDice = document.getElementById('dice-loc-' + id);
    if (currentDice && !currentDice.matches('.lock')) {
        currentDice.classList.add('lock');
    } else if (currentDice && currentDice.matches('.lock')) {
        currentDice.classList.remove('lock');
    }
}

function startGame () {
    TWA.expand();
    TWA.BackButton.show();
    postAjax('/games/new-game', { userId: user.id })
        .done(function (data) {
            if (data.ok) {
                setupGame(data.data, false);

                $('#game').css('display', 'block');
                $('#index').css('display', 'none');
            } else {
                TWA.showAlert(data.message);
            }
        }).fail(function () {
            TWA.showAlert('please check your internet connection');
        });
}

function resumeGame () {
    TWA.expand();
    TWA.BackButton.show();
    postAjax('/games/resume', { userId: user.id, gameId: user.gameId })
        .done(function (data) {
            if (data.ok) {
                setupGame(data.data, false);
                $('#game').css('display', 'block');
                $('#index').css('display', 'none');
            } else {
                TWA.showAlert(data.message);
            }
        }).fail(function () {
            TWA.showAlert('please check your internet connection');
        });
}

function closeGame () {
    $('#index').css('display', 'block');
    $('#game').css('display', 'none');
    TWA.BackButton.hide();

    initGame();
}

function setupGame (data, rolling) {
    user.gameId = data.gameId;
    setTimeout(function () {
        if (rolling) {
            clearInterval(rolling);
        }
        for (let i = 1; i < 6; i++) {
            const currentDice = document.getElementById('dice-loc-' + i);
            const diceIndex = i - 1;
            if (currentDice && data.dices[diceIndex]) {
                currentDice.innerHTML = '<img src="images/dice_' + data.dices[diceIndex] + '.svg">';
            }
            if (currentDice && !data.dices[diceIndex]) {
                currentDice.innerHTML = '<img src="images/dice_chance.svg">';

                if (currentDice && currentDice.matches('.lock')) {
                    currentDice.classList.remove('lock');
                }
            }
        }
        if (data.rolls >= 3) {
            updateMainButton('roll', true, false, ' (3/3) - Play a rule!');
        } else {
            updateMainButton('roll', true, true, ` (${data.rolls}/3)`);
        }
        prosessRulesTable(data.rules);
        if (data.score) {
            $('#score').html(data.score);
        }
        if (data.upperSectionBonus) {
            if (data.upperSectionBonus.upperSectionScore < 63) {
                const percentage = data.upperSectionBonus.upperSectionScore * 100 / 63;
                const dashoffset = 439.6 * ((100 - percentage) / 100);
                $('#progress').attr('stroke-dashoffset', dashoffset + 'px');
            } else {
                $('#progress').attr('stroke-dashoffset', '0px');
                $('#bounce').html('<button class="btn btn-outline-success">' + data.upperSectionBonus.score + '</button>');
            }
        }
        if (data.gameOver) {
            if (data.score) {
                TWA.showPopup({
                    title: 'Game Over',
                    message: 'you get ' + data.score + ' score in this game',
                    buttons: [{
                        id: 'gameOver',
                        type: 'ok',
                        text: 'ok'
                    }]
                });

                closeGame();
            }
        }
    }, 500);
}

function prosessRulesTable (rules) {
    Object.keys(rules).forEach(function (ruleKey) {
        if (rules[ruleKey].filled) {
            $(`#${ruleKey}`).html('<button class="btn btn-outline-success" >' + rules[ruleKey].score + '</button>');
        } else {
            $(`#${ruleKey}`).html('<button class="btn btn-success" id="play' + ruleKey + '" >' + rules[ruleKey].playableScore + '</button>');
            $('#play' + ruleKey).click(function () { playGame(ruleKey); });
        }
    });
}

function playGame (ruleKey) {
    postAjax('/games/play', { gameId: user.gameId, userId: user.id, rule: ruleKey })
        .done(function (data) {
            if (data.ok) {
                setupGame(data.data, false);
            } else {
                TWA.showAlert(data.message);
            }
        }).fail(function () {
            TWA.showAlert('please check your internet connection');
        });
}

function showRuleDescription (ruleKey) {
    TWA.showPopup({
        title: rules[ruleKey].title,
        message: rules[ruleKey].description
    });
}
