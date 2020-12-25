class Card {
    constructor(id, suit, rank, myRank, open) {
      this.id = id;
      this.suit = suit;
      this.rank = rank;
      this.myRank = myRank;
      this.open = open;
    }
    isPlayed() {
      this.open = true;
    }
}

module.exports = Card;