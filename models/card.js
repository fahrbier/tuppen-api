class Card {
    constructor(id, suit, rank, myRank, isPlayed) {
      this.id = id;
      this.suit = suit;
      this.rank = rank;
      this.myRank = myRank;
      this.open = isPlayed;
    }
    isPlayed() {
      this.open = true;
    }
}

 module.exports = Card;