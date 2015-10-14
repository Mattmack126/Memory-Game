var cardList = ["Ace of Spades", "Ace of Clubs",
    "Ace of Hearts", "Ace of Diamonds", "King of Hearts",
    "King of Spades", "King of Diamonds", "King of clubs",
]
var compareCard1 = "";
var compareCard2 = "";
var playerScore = 0;


var cardSet = function(cardlist, noOfPairs) {
    var tempCardList = _.sample(cardlist, noOfPairs);
    var finalList = tempCardList.concat(tempCardList);
    return finalList;
}

var cardComparitor = function(card1, card2) {
    if (card1 === card2) {
        Match = true;
        $("."+compareCard1).addClass("Matched");
        $("."+compareCard2).addClass("Matched");
        console.log(Match);
        return Match;

    } else {
        Match = false;
        console.log(Match);
        return Match;
    }
}


finalSet = cardSet(cardList, 2);
var boardSetUp = function(cardSet) {
    $("#boardArea").remove();
    playerScore = 0;
    $("#totalScore").html("Score : " + playerScore);
    $("section").eq(0).append("<section id = boardArea/>")
    for (i = 0; i < cardSet.length; i++) {
        $("#boardArea").append("<div class = col-2 ><img " + "class = " + (cardSet[i].replace(/\s/g, '')) + " src='CardBack.jpg'></div>");
        $("." + cardSet[i].replace(/\s/g, '')).addClass("cardBack")
    }
    $('#boardArea').on("click", "img", function() {
        var $cardName = $(event.target).attr("class").split(' ')[0];
        console.log($cardName);


        $(event.target).attr("src", $cardName + ".png")

        if ((compareCard1 === "") && ($(event.target).hasClass("Matched") !== true)) {
            compareCard1 = $cardName;
            console.log("firstCHeck");
            $(event.target).addClass("Check");
            return

        } else if (($(event.target).hasClass("Check") !== true) && ($(event.target).hasClass("Matched") !== true)) {

            compareCard2 = $cardName;
            Match = cardComparitor(compareCard1, compareCard2);
            if (Match === true) {
                playerScore = playerScore + 1;
                console.log("true")
                $("." + compareCard1).removeClass("Check");
                console.log(compareCard1, compareCard2);
                compareCard1 = "";
                compareCard2 = "";
                $("#totalScore").html("Score : " + playerScore);
            } else {
                console.log("false")
                $("." + compareCard1).removeClass("Check");
                setTimeout(function() {
                    $("." + tempCard1).attr("src", 'CardBack.jpg');
                    $("." + tempCard2).attr("src", 'CardBack.jpg');
                 

                }, 2500)
               
             
                tempCard1 = compareCard1;
                tempCard2 = compareCard2;
                compareCard1 = "";
                compareCard2 = "";
            }

        } else {
            return;
        }

    });
}