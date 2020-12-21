class Player {
    constructor(id, namePlayer, cardPlayed, myTurn, hand) {
      this.id = id;
      this.namePlayer = namePlayer;
      this.cardPlayed = cardPlayed;
      this.myTurn = myTurn;
      this.hand = hand;
    }
    
    playCard(idCard) {
      this.hand.find(x => x.id === idCard).isPlayed = true;
      return this.hand.find(x => x.id === idCard);
    }
  }

 module.exports = Player;