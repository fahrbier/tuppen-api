class Card {
    constructor(id, suit, rank, myRank, open) {
      this.id = id;
      this.suit = suit;     
      this.rank = rank;     //- common rank of the card
      
      this.myRank = myRank; //- rank of the card for the concrete game like e.g. Tuppen
      
      this.open = open;     //- card is open to all players (is played)
    }
    isPlayed() {
      this.open = true;
    }
}

module.exports = Card;