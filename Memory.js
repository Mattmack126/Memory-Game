var coreGame = {
    cardList: ["Ace of Spades", "Ace of Clubs",
        "Ace of Hearts", "Ace of Diamonds", "King of Hearts",
        "King of Spades", "King of Diamonds", "King of clubs",
    ],
    compareCard1: "",
    compareCard2: "",
    playerScore: 0,
    cardName: "",
    clickCount: 0,
    boardSetUp: function(cards) {
        // Populates the window with the divs' and images'
        $("#boardArea").remove();
        playerScore = 0;
        $("#totalScore").html("Score : " + playerScore);
        $("section").eq(0).append("<section id = boardArea/>")
        for (i = 0; i < cards.length; i++) {
            $("#boardArea").append("<div class='card'><img class='" + (cards[i].replace(/\s/g, '')) + "' src='CardBack.jpg'></div>");
            $("." + cards[i].replace(/\s/g, '')).addClass("cardBack")
        }
    },
    cardComparitor: function(card1, card2) {
        // Compares the two flipped cards, if they are the same it adds the "Matched" class and returns true, if not it returns a false value
        if (card1 === card2) {
            Match = true;
            $("." + coreGame.compareCard1).addClass("Matched");
            $("." + coreGame.compareCard2).addClass("Matched");
            return Match;
        } else {
            Match = false;
            return Match;
        }
    },
    cardSet: function(cardlist, noOfPairs) {
        // Sets up the list of cards that will be used for the game
        var tempCardList = _.sample(cardlist, noOfPairs);
        var finalList = tempCardList.concat(tempCardList);
        return finalList;
    },
    checkForMatch: function() {
        // Runs the comparitor function, retrieves a true or false reply
        coreGame.compareCard2 = cardName;
        Match = coreGame.cardComparitor(coreGame.compareCard1, coreGame.compareCard2);
        // Removes the Check class from the first card if comparitor returns true it adds 1 to player score
        if (Match === true) {
            playerScore = playerScore + 1;
            $("." + coreGame.compareCard1).removeClass("Check");
            coreGame.compareCard1 = "";
            coreGame.compareCard2 = "";
            $("#totalScore").html("Score : " + playerScore);
            coreGame.clickCount = 0;
        } else {
            // removes "Check" class from the first card and flips the two revealed cards over
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
        // Sets up the click events on images
        $('#boardArea').on("click", "img", function() {
            $selectedCard = $(event.target);
            cardName = $selectedCard.attr("class").split(' ')[0];
            // flips the first card and adds the class "Check" too it
            if (!$selectedCard.hasClass("Matched") && (coreGame.clickCount === 0)) {
                coreGame.compareCard1 = cardName;
                coreGame.clickCount = 1;
                $selectedCard.attr("src", cardName + ".png").addClass("Check");
                // $selectedCard
                return
                //flips the seconds card and runs the second card function
            } else if (!$selectedCard.hasClass("Check") && !$selectedCard.hasClass("Matched") && coreGame.clickCount === 1) {
                coreGame.clickCount = 2;
                $selectedCard.attr("src", cardName + ".png");
                coreGame.checkForMatch();
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
startGame();