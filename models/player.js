class Player {
    constructor(id, namePlayer, cardPlayed, myTurn, hasAnCard, hand) {
      this.id = id;
      this.namePlayer = namePlayer;
      this.cardPlayed = cardPlayed;
      this.myTurn = myTurn;
      this.hasAnCard = hasAnCard;
      this.hand = hand;
    }
    
    playCard(idCard) {
      var card = this.hand.find(x => x.id === idCard);
      card.isPlayed();
      this.cardPlayed = card;
      return card;
    }

    giveAnCard() {
      this.hasAnCard = true;
    }
  }

 module.exports = Player;