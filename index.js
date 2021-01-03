const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const Player = require('./models/Player');
const TuppenGame = require('./models/TuppenGame');

//-- get a deck of cards
const deck = require('./services/deck');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

app.use('/', express.static('static'))

var cardsPerHand = 4;
var currentPlayer = 0;
var playersInParty = 0;
var playersPlayed = 0;
var tuppenGame = {};

/**
 * Deals card for a game of the given amount of players
 */
app.get('/deal', (req, res) => {
    var shuffle = [...deck]; //-- not actually shuffleing, it just clones the array, which is the deck
    var party = []; //-- List of all Players is a party


    playersInParty = req.query.playersAmount ? req.query.playersAmount : 4;
    party = [];

    for (var p=1; p <= playersInParty; p++) {
        var hand = [];
        for (var c=0; c<cardsPerHand; c++) {
            draw = Math.floor(Math.random() * shuffle.length); //-- this is the 'shuffleing' deal a random card from the deck
            card = shuffle.splice(draw, 1);
            hand.push(card[0]);
        }  
        party.push(
                    new Player(
                        uuidv4(),
                        'John Doe ' + p, 
                        {}, 
                        false, 
                        false, 
                        hand
                    )
                );
    }

    //-- first player of a party gets always "Ankart" for now
    party[0].setHasAnCard();
    party[0].setIsTurn();

    tuppenGame = new TuppenGame(uuidv4(), party);


    //-- after dealing the cards, redirect to the game immediately
    res.redirect('/gameDebug');
});

/**
 * Plays one card of the current Player
 */
app.get('/play', (req, res) => {
    console.log('user from header' + req.header('idPlayer'));
    var idPlayer = req.header('idPlayer');
    var idCard = req.query.idCard; 
    

    var playedCard = party[currentPlayer].playCard(idCard);
    playersPlayed++;
    

    //-- set isTurn for next player. 
    party.map(function(player, index) {
        if (index == currentPlayer) {
            player.setIsTurn();
        }
        else {
            player.unsetIsTurn();
        }
        return player;
    });  

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
                player.setHasAnCard();
            }
            else {
                player.unsetHasAnCard();
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
    var idPlayer = req.header('idPlayer');   
});

/**
 * Returns the current state of the game
 * Useful for developing an debugging an UI
 * but for sure not for a real game, since
 * this endpoint reveals everything
 */
app.get('/gameDebug', (req, res) => {
    res.json(tuppenGame);
});

app.get('/game', (req, res) => {
    
    tuppenGameClone = JSON.parse(JSON.stringify(tuppenGame));
    
    var idPlayer = req.header('idPlayer')
    var myPartyView = tuppenGameClone.party;
    
    myPartyView.forEach( function(playerClone) {
        if (playerClone.id == idPlayer) {
            myPartyView.push(playerClone);
        }
        else {
            var hand = playerClone.hand;
            myPartyView.hand = playerClone.hand.map(function(card, index){
                if (!card.open) {
                    card.suit = '*';
                    card.rank = '*';
                    card.myRank = '*';
                }
                return card;
            });
            myPartyView.push(playerClone);
        }
    });
    tuppenGameClone.party = myPartyView;
    res.json(tuppenGameClone);
});

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});