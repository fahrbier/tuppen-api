class Player {
    constructor(id, namePlayer, cardPlayed, hasAnCard,isTurn, hand) {
      this.id = id;
      this.namePlayer = namePlayer;
      this.cardPlayed = cardPlayed;
      this.hasAnCard = hasAnCard;
      this.isTurn = isTurn;
      this.hand = hand;
    }
    
    playCard(idCard) {
      var card = this.hand.find(x => x.id === idCard);
      card.isPlayed();
      this.cardPlayed = card;
      return card;
    }

    setHasAnCard() {
      this.hasAnCard = true;
    }
    unsetHasAnCard() {
      this.hasAnCard = false;
    }

    setIsTurn() {
      this.isTurn = true;
    }
    unsetIsTurn() {
      this.isTurn = false;
    }
}

module.exports = Player;