class Player {
    constructor(id, namePlayer, cardPlayed, myTurn, hand) {
      this.id = id;
      this.namePlayer = namePlayer;
      this.cardPlayed = cardPlayed;
      this.myTurn = myTurn;
      this.hand = hand;
    }
  }

 module.exports = Player;