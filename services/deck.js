const Card = require('../models/Card');
const { v4: uuidv4 } = require('uuid');

function deck(){

    const myRank = {
        'j' : 1,
        'q' : 2,
        'k' : 3,
        'a' : 4,
        '7' : 5,
        '8' : 6,
        '9' : 7,
        '10' : 8    
    };
    
    const cardColor = ['hearts','clubs','spades','diams'];
    const cardValue = ['j','q','k','a','7','8','9','10'];
    
    var deck = [];
    
    cardColor.forEach((cardColorValue, cardColorIndex, cardColorArray) => {
        cardValue.forEach((cardValueValue, cardValueIndex, cardValueArray) => {
            deck.push(new Card(uuidv4(),cardColorValue,cardValueValue,myRank[cardValueValue], false));
        });
    });

    return deck;
}

module.exports = deck();