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
      //-- var handClone = [...this.hand];    THIS DOES NOT WORK FOR AN ARRAY OF OBJECTS!!! 
      //-- let's do it like https://medium.com/javascript-in-plain-english/how-to-deep-copy-objects-and-arrays-in-javascript-7c911359b089
      
      var handClone = JSON.parse(JSON.stringify(this.hand));
      return new Player(this.id, this.namePlayer, this.cardPlayed, this.hasAnCard, handClone)
    }
  }

 module.exports = Player;