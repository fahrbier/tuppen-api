class Card {
    constructor(id, color, value, rank, isPlayed) {
      this.id = id;
      this.color = color;
      this.value = value;
      this.rank = rank;
      this.open = isPlayed;
    }
    isPlayed() {
      this.open = true;
    }
}

 module.exports = Card;