class TuppenGame {
    constructor(id, party, isHaengeln) {
      this.id = id;
      this.isHaengeln = false;
      this.party = party;      
    }
    maxPlayer() {
        if(this.isHaengeln) {
            return 2;
        }
        return 6;
    }

    minPlayer() {
        return 2;
    }

}

module.exports = TuppenGame;