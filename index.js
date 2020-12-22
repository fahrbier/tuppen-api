const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const Player = require('./models/Player');

//-- get a deck of cards
const deck = require('./services/deck');

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
var currentPlayer = 0;
var playersInParty = 0;
var playersPlayed = 0;
var party = []; //-- List of all Players is a party




/**
 * Deals card for a game of the given amount of players
 */
app.get('/deal', (req, res) => {
    
    var shuffle = [...deck]; //-- not actually shuffleing, it just clones the array, which is the deck

    playersInParty = req.query.playersAmount ? req.query.playersAmount : playersDefault.default;
    party = [];

    for (var p=1; p <= playersInParty; p++) {
        var hand = [];
        for (var c=0; c<cardsPerHand; c++) {
            draw = Math.floor(Math.random() * shuffle.length); //-- this is the 'shuffleing' deal a random card from the deck
            card = shuffle.splice(draw, 1);
            hand.push(card[0]);
        }  
        party.push(new Player(uuidv4(),'John Doe ' + p, {}, false, false, hand));
    }

    //-- first player of a party gets always "Ankart" for now
    party[0].giveAnCard();

    //-- after dealing the cards, redirect to the game immediately
    res.redirect('/game');
});

/**
 * Plays one card of the current Player
 */
app.get('/play', (req, res) => {
    var idCard = req.query.idCard; 
    
    var playedCard = party[currentPlayer].playCard(idCard);
    playersPlayed++;
    
    if (playersPlayed < playersInParty) {
        //-- round robin while a round is still in play
        if (currentPlayer < party.length-1) {
            currentPlayer++;
        }
        else {
            currentPlayer = 0;
        }
    }    
    else {
        //-- all players in game put down a card, now see who won
        //-- find player with "Ankart" and get his card
        var anCard = party.find(x => x.hasAnCard === true).cardPlayed;
        //-- find all players who played cards of the same color like anCard, incl. anCard        
        var allPlayersWithCardsAlikeAnCard = party.filter(x => x.cardPlayed.color == anCard.color);
        //-- sort that list to find next anCard Player             
        var allPlayersRanked = allPlayersWithCardsAlikeAnCard.sort((a, b) => (a.cardPlayed.rank > b.cardPlayed.rank) ? true : false);

        console.log(anCard);
        console.log(allPlayersRanked);

        playersPlayed = 0;
    }
    
    res.json(playedCard); 
});



/**
 * Any Player can withdraw the game and end the round at any given time
 */
app.get('/withdraw', (req, res) => {
    var idPlayer = req.query.idPlayer;   
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
        'myTurn' : req.query.player == currentPlayer, 
        'hand': player[req.query.player]
    });

});



// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});