var cardList = ["Ace of Spades", "Ace of Clubs", "Ace of Hearts", "Ace of Diamonds", "king of Hearts", "king of Spades",
    "King of Diamonds", "King of clubs", "Joker"
]
var compareCard1 = "";
var compareCard2 = "";

var cardSet = function(cardlist, noOfPairs) {
    var tempCardList = _.sample(cardlist, noOfPairs);
    var finalList = tempCardList.concat(tempCardList);
    return finalList;
}

var cardComparitor = function(card1, card2) {
    console.log("test")
    return

}


finalSet = cardSet(cardList, 9);
var boardSetUp = function(cardSet) {
    $("section").eq(0).append("<section id = boardArea/>")
    for (i = 0; i < cardSet.length; i++) {
        $("#boardArea").append("<div " + "class = col-2 ><img " + "class = " + (cardSet[i].replace(/\s/g, '')) + " src='CardBack.jpg' alt='" + cardSet[i] +
            "'></div>");
    }
    $('#boardArea').on("click", "img", function() {
            var CardName = this.className;

            if (compareCard1 === "") {
                compareCard1 = CardName;
                console.log("firstCHeck")

                return;
            } else
                compareCard2 = CardName;
            cardComparitor(compareCard1, compareCard2);
            compareCard1 = "";
            compareCard2 = "";
            return
        })
}