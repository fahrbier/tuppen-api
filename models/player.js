class Player {
    constructor(id, namePlayer, cardPlayed, hasAnCard, hand) {
      this.id = id;
      this.namePlayer = namePlayer;
      this.cardPlayed = cardPlayed;
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

    clone() {
      var handClone = [...this.hand];    
      return new Player(this.id, this.namePlayer, this.cardPlayed, this.hasAnCard, handClone)
    }
  }

 module.exports = Player;