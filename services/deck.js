const Card = require('../models/Card');
const { v4: uuidv4 } = require('uuid');

function deck(){

    const rank = {
        'jack' : 1,
        'queen' : 2,
        'king' : 3,
        'ace' : 4,
        'seven' : 5,
        'eight' : 6,
        'nine' : 7,
        'ten' : 8    
    };
    
    const cardColor = ['hearts','clubs','spade','diamond'];
    const cardValue = ['jack','queen','king','ace','seven','eight','nine','ten'];
    
    var deck = [];
    
    cardColor.forEach((cardColorValue, cardColorIndex, cardColorArray) => {
        cardValue.forEach((cardValueValue, cardValueIndex, cardValueArray) => {
            deck.push(new Card(uuidv4(),cardColorValue,cardValueValue,rank[cardValueValue], false));
        });
    });

    return deck;
}

module.exports = deck();