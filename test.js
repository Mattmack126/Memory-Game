var cards = [];
var topScoreIndex = 0;
var topScore = 0;

var busy = false;
var coreGame = {
    cardPairs: 0,
    compareCardsArray: [],
    createCardPack: function(paircount) {
        var cardvalue = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];
        var cardsuite = ['hearts', 'clubs', 'diamonds', 'spades'];
        var temp = [];
        for (var v = 0; v < cardvalue.length; v++)
            for (var s = 0; s < cardsuite.length; s++) {
                var cname = cardvalue[v] + '_of_' + cardsuite[s];
                temp.push({
                    faceimage: cname + '.png',
                    backimage: 'CardBack.jpg',
                    flipped: false,
                    matched: false
                })
            }
        var set1 = _.sample(temp, paircount);
        var set2 = JSON.parse(JSON.stringify(set1))
        var set12 = set1.concat(set2);
        return _.shuffle(set12);
    },
    showCardsPlaceHolders: function(cardset) {
        $("#boardarea").empty().off("click", "img");
        for (var i = 0; i < cardset.length; i++) {
            var c = cardset[i];
            $("#boardarea").append("<div class='card' id='card" + i + "' cardid='" + i + "'>?</div>");
        }
        $("#boardarea").on("click", "img", function() {
            coreGame.cardclicked($(event.target).parent().attr('cardid'))
        });
    },
    cardface: function(c) {
        return (c.flipped ? "PNG-cards-1.3/" + c.faceimage : c.backimage);
    },
    cardclicked: function(id) {
        if (busy || (cards[id].matched) || (coreGame.compareCardsArray.length === 2) || (cards[id].flipped)) {
            return;
        } else if (cards[id].shuffle) {
            cards[id].flipped = !cards[id].flipped;
            var tempArray = coreGame.compareCardsArray;
            busy = true;
            
            coreGame.ShowCards(cards);
            setTimeout(function() {
                cards[id].flipped = !cards[id].flipped;
                if (tempArray.length === 1) {
                    tempArray[0].flipped = !tempArray[0].flipped;
                }
                coreGame.ShuffleCardShuffle(cards)
                coreGame.ShowCards(cards);
                coreGame.compareCardsArray = [];
                busy = false;
                multiPlayer.nextPlayer();
                coreGame.showScores(multiPlayer);
            }, 1000)
            
            return
        }
        $('#card' + id).addClass("up");
        cards[id].flipped = !cards[id].flipped;
        coreGame.compareCardsArray.push(cards[id]);
        if (coreGame.compareCardsArray.length === 2) {
            coreGame.scoreCount(coreGame.comparitor(coreGame.compareCardsArray))
        }
        setTimeout(function() {
            $('#card' + id).removeClass("up").addClass("flipped");
            coreGame.ShowCards(cards);
        }, 100)
    },
    ShowCards: function(cardset) {
        for (var i = 0; i < cardset.length; i++) {
            var c = cardset[i];
            $("#card" + i).html("<img src=" + coreGame.cardface(c) + "></img>");
        }
    },
    AddShuffleCards: function(cardset) {
        cardset.push({
            faceimage: 'red_joker.png',
            backimage: 'CardBack1.jpg',
            flipped: false,
            matched: false,
            shuffle: true
        })
        cardset.push({
            faceimage: 'black_joker.png',
            backimage: 'CardBack1.jpg',
            flipped: false,
            matched: false,
            shuffle: true
        })
        return _.shuffle(cardset);
    },
    ShuffleCardShuffle: function(cardset) {
        cards = _.shuffle(cardset);
    },
    comparitor: function(compareArray) {
        if (compareArray[0].faceimage === compareArray[1].faceimage) {
            return true
        } else
            return false;
    },
    scoreCount: function(compareResults) {
        switch (compareResults) {
            case true:
                multiPlayer.currentPlayer().score++;
                coreGame.upDateWinner(multiPlayer.currentPlayer().score);
                coreGame.showScores(multiPlayer);
                for (i = 0; i < coreGame.compareCardsArray.length; i++) {
                    coreGame.compareCardsArray[i].matched = !coreGame.compareCardsArray[i].matched;
                }
                coreGame.compareCardsArray = [];
                if (coreGame.checkWin(cards) === true) {
                    coreGame.showWinner(coreGame.topScoreIndex);
                } else break

            case false:
                busy = true;
                setTimeout(function() {
                    for (i = 0; i < coreGame.compareCardsArray.length; i++) {
                        coreGame.compareCardsArray[i].flipped = !coreGame.compareCardsArray[i].flipped;
                    }
                    $(".flipped").addClass("up");
                    coreGame.compareCardsArray = [];
                    setTimeout(function() {
                        $('.flipped').removeClass("up").removeClass("flipped");
                        coreGame.ShowCards(cards);
                    }, 100)

                    busy = false;
                    multiPlayer.nextPlayer();
                    coreGame.showScores(multiPlayer);
                }, 1000)
                break;
        }
    },
    checkWin: function(cardset) {
        var gameWon = true
        for (i = 0; i < cardset.length; i++) {
            if ((cardset[i].matched === false) && (!cardset[i].shuffle)) {
                gameWon = false;
            }
        }
        return gameWon;


    },
    showScores: function(mp) {
        $("#playerScore").html("<h3>" + mp.currentPlayer().name + " Score : " + mp.currentPlayer().score + "</h3>");
    },
    upDateWinner: function(playerScore) {
        if (playerScore > topScore) {
            topScore = playerScore;
            topScoreIndex = multiPlayer.playerTurn;
        }
    },
    showWinner: function(playerIndex) {
        $("#boardarea").empty().off("click", "img").html("<h3>" + multiPlayer.playerArray[topScoreIndex].name + " is the winner with a score of : " + multiPlayer.playerArray[topScoreIndex].score);
        return
    }
}









var multiPlayer = {
    playerCount: 2,
    playerArray: [{
        name: "Player1",
        score: 0
    }, {
        name: "Player2",
        score: 0
    }, {
        name: "Player3",
        score: 0
    }, {
        name: "Player4",
        score: 0
    }],
    playerTurn: 0,
    currentPlayer: function() {
        return multiPlayer.playerArray[multiPlayer.playerTurn];
    },

    init: function(numPlayers) {
        $.map(multiPlayer.playerArray, function(player) {
            player.score = 0
        });
        multiPlayer.playerTurn = 0;
        topScore = 0;
        topScoreIndex = 0;
        multiPlayer.playerCount = numPlayers;
    },
    nextPlayer: function() {
        multiPlayer.playerTurn++;
        if (multiPlayer.playerCount === multiPlayer.playerTurn) {
            multiPlayer.playerTurn = 0;
        }
    }
}

function start(numPlayers) {
    coreGame.cardPairs = parseInt($("#PairNumber").val());
    multiPlayer.init(numPlayers);
    cards = coreGame.createCardPack(coreGame.cardPairs);
    if ($("#Jokers").prop('checked') === true) {
        cards = coreGame.AddShuffleCards(cards);
    }
    coreGame.showCardsPlaceHolders(cards);
    coreGame.ShowCards(cards);
    coreGame.showScores(multiPlayer);
}
$("#onePlayer").click(function() {
    start(1)
});
$("#twoPlayer").click(function() {
    start(2)
});