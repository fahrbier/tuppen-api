# tuppen-api
API to facilitate a game of Siebenschräm. 

## Relevant Enpoints

`/deal?playersAmount={n}`

Call this method once to deal four cards each to each player. The amount of players is determined by n and can be between 2 and 6. If no playersAmount parameter is present, the default is set to 4.

`/game?idPlayer={idPlayer}`

Returns the state of the game for a given player, without revealing the entire state of the others in the party

`/play?idCard={idCard}`

Plays a card idPlayer from the hand of the current player.

`/gameDebug`

Returns the current state of the game.
Useful for developing an debugging an UI but for sure not for a real game, since this endpoint reveals everything

`/withdraw?idPlayer={idPlayer}`

Makes a player to withdraw - the player is removed from the current game.

##Credits

The example UI that comes with the API code uses **CSS Playing Cards help you to create simple and semantic playing cards in (X)HTML**.
from https://github.com/selfthinker/CSS-Playing-Cards by Anika Henke anika@selfthinker.org
