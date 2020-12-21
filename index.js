const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


const Card = require('./models/Card');
const Player = require('./models/Player');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

var playersDefault = {
    'max' : 6,
    'min' : 2,
    'default' : 4
};

var cardsPerHand = 4;
var cardPlayed = {};
var currentPlayer = 0;
var party = []; //-- List of all Players is a party

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
        deck.push(new Card(uuidv4(),cardColorValue,cardValueValue,false));
    });
});


/**
 * Deals card for a game of the given amount of players
 */
app.get('/deal', (req, res) => {
    
    var shuffle = [...deck]; //-- not actually shuffleing, it just clones the array, which is the deck

    var pls = req.query.playersAmount ? req.query.playersAmount : playersDefault.default;
    party = [];

    for (var p=1; p <= pls; p++) {
        var hand = [];
        for (var c=0; c<cardsPerHand; c++) {
            draw = Math.floor(Math.random() * shuffle.length); //-- this is the 'shuffleing' deal a random card from the deck
            card = shuffle.splice(draw, 1);
            hand.push(card[0]);
        }  
        party.push(new Player(uuidv4(),'John Doe ' + p, {}, false, hand));
    }

    //-- after dealing the cards, redirect to the game immediately
    res.redirect('/game');
});

/**
 * Plays one card of the current Player
 */
app.get('/play', (req, res) => {
    var idCard = req.query.idCard; 
    var idPlayer = party[currentPlayer].id;
    
    var playedCard = party[currentPlayer].playCard(idCard);

    
    //-- simple round robin for now. 
    //-- Todo: After the whole party played it is determined who starts next round
    if (currentPlayer < party.length-1) {
        currentPlayer++;
    }
    else {
        currentPlayer = 0;
    }

    res.json(playedCard); 

   
});
 
/**
 * Returns only the current state of the game
 */
app.get('/game', (req, res) => {
    res.json(party);
});

/**
 * Show a player's hand
 */
app.get('/hand', (req, res) => { 
    
    res.json({
        'player' : req.query.player,
        'cardPlayed': cardPlayed,
        'myTurn' : req.query.player == currentPlayer, 
        'hand': player[req.query.player]
    });

});



// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});