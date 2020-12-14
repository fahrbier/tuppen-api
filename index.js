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

var amountPlayers = 4;
var cardsPerHand = 4;
var cardPlayed = {};
var currentPlayer = 1;
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



app.get('/deal', (req, res) => {
    
    var shuffle = [...deck]; //-- clones the array

    for (var p=1; p<=amountPlayers; p++) {
        var hand = [];
        for (var c=0; c<cardsPerHand; c++) {
            draw = Math.floor(Math.random() * shuffle.length);
            card = shuffle.splice(draw, 1);
            hand.push(card);
        }  
        party.push(new Player(uuidv4(),'John Doe ' + p, {}, false, hand));
    }
   
    res.json(party);
});

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