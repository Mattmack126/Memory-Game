var coreGame = {
    cardList: ["Ace of Spades", "Ace of Clubs",
        "Ace of Hearts", "Ace of Diamonds", "King of Hearts",
        "King of Spades", "King of Diamonds", "King of clubs",
    ],
    compareCard1: "",
    compareCard2: "",
    playerScore: 0,
    $cardName: "",
    clickCount: 0,
    boardSetUp: function(cardSet) {
        $("#boardArea").remove();
        playerScore = 0;
        $("#totalScore").html("Score : " + playerScore);
        $("section").eq(0).append("<section id = boardArea/>")
        for (i = 0; i < cardSet.length; i++) {
            $("#boardArea").append("<div class = <col-3></col-3> ><img " + "class = " + (cardSet[i].replace(/\s/g, '')) + " src='CardBack.jpg'></div>");
            $("." + cardSet[i].replace(/\s/g, '')).addClass("cardBack")
        }
    },
    cardComparitor: function(card1, card2) {
        if (card1 === card2) {
            Match = true;
            $("." + coreGame.compareCard1).addClass("Matched");
            $("." + coreGame.compareCard2).addClass("Matched");
            return Match;
        } else {
            Match = false;
            console.log(Match);
            return Match;
        }
    },
    cardSet: function(cardlist, noOfPairs) {
        var tempCardList = _.sample(cardlist, noOfPairs);
        var finalList = tempCardList.concat(tempCardList);
        return finalList;
    },
    secondCard: function() {
        coreGame.compareCard2 = $cardName;
        Match = coreGame.cardComparitor(coreGame.compareCard1, coreGame.compareCard2);
        if (Match === true) {
            playerScore = playerScore + 1;
            console.log("true")
            $("." + coreGame.compareCard1).removeClass("Check");
            console.log(coreGame.compareCard1, coreGame.compareCard2);
            coreGame.compareCard1 = "";
            coreGame.compareCard2 = "";
            $("#totalScore").html("Score : " + playerScore);
        } else {
            console.log("false")
            $("." + coreGame.compareCard1).removeClass("Check");

            setTimeout(function() {
                $("." + tempCard1).attr("src", 'CardBack.jpg');
                $("." + tempCard2).attr("src", 'CardBack.jpg');
                coreGame.clickCount = 0;
            }, 2000)
            tempCard1 = coreGame.compareCard1;
            tempCard2 = coreGame.compareCard2;
            coreGame.compareCard1 = "";
            coreGame.compareCard2 = "";
        }
    },
    onClickSetup: function() {
        $('#boardArea').on("click", "img", function() {
            $cardName = $(event.target).attr("class").split(' ')[0];
            if ((coreGame.compareCard1 === "") && ($(event.target).hasClass("Matched") !== true) && (coreGame.clickCount !== 2)) {
                coreGame.compareCard1 = $cardName;
                coreGame.clickCount = coreGame.clickCount + 1;
                 $(event.target).attr("src", $cardName + ".png")
                $(event.target).addClass("Check");
                return
            } else if (($(event.target).hasClass("Check") !== true) && ($(event.target).hasClass("Matched") !== true) && (coreGame.clickCount !== 2)) {
                coreGame.clickCount = coreGame.clickCount + 1;
                $(event.target).attr("src", $cardName + ".png")
                coreGame.secondCard();
            } else {
                return;
            }
        });
    }
}
var startGame = function() {
    var finalSet = coreGame.cardSet(coreGame.cardList, 8);
    coreGame.boardSetUp(finalSet);
    coreGame.onClickSetup();
}