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
//app.get('/', (req, res) => {
//    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
//});

app.use('/', express.static('static'))

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
        party.push(new Player(uuidv4(),'John Doe ' + p, {}, false, hand));
    }

    //-- first player of a party gets always "Ankart" for now
    party[0].giveAnCard();

    //-- after dealing the cards, redirect to the game immediately
    res.redirect('/gameDebug');
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
        //-- find player with "anCard" and get his card
        var anCard = party.find(x => x.hasAnCard === true).cardPlayed;
        //-- find all players who played cards of the same color like anCard, incl. anCard and rank that list       
        var allPlayersRanked = party
                                .filter(x => x.cardPlayed.suit == anCard.suit)
                                .sort((a, b) => (a.cardPlayed.myRank < b.cardPlayed.myRank) ? 1 : -1);

        //-- set new anCard to first player of allPlayersRanked. 
        party.map(function(player, index) {
            if (player.id == allPlayersRanked[0].id) {
                player.hasAnCard = true;
            }
            else {
                player.hasAnCard = false;
            }
            //-- reset also the cardPlayed for the next round
            player.cardPlayed = {};
            return player;
        });
        
        //-- next round, new ankart start, no one played so far and set currentPlayer to the one which has ankart
        currentPlayer = party.findIndex(function(player){
            return player.hasAnCard == true;
        });
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
 * Returns the current state of the game
 * Useful for developing an debugging an UI
 * but for sure not for a real game, since
 * this endpoint reveals everything
 */
app.get('/gameDebug', (req, res) => {
    res.json(party);
});

app.get('/game', (req, res) => {
   
    var idPlayer = req.query.idPlayer
    var myPartyView = [];
    party.forEach( function(player) {
        if (player.id == idPlayer) {
            myPartyView.push(player);
        }
        else {
            playerClone = player.clone();
            var hand = playerClone.hand;
            hand = hand.map(function(card, index){
                if (!card.open) {
                    card.suit = '*';
                    card.rank = '*';
                    card.myRank = '*';
                }
                return card;
            });
            playerClone.hand = hand;
            myPartyView.push(playerClone);
        }
    });

    res.json(myPartyView);
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});