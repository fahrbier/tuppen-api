# tuppen-api
API to facilitate a game of Siebenschräm. 

## Relevant Enpoints

`/deal?playersAmount={n}`

Call this method once to deal four cards each to each player. The amount of players is determined by n and can be between 2 and 6. If no playersAmount parameter is present, the default is set to 4.

`/hand?idPlayer={idPlayer}`

Returns the hand of a given idPlayer

`/play?idCard={idCard}`

Plays a card idPlayer from the hand of the current player.

`/game`

Returns the current game in the current state.

`/withdraw?idPlayer={idPlayer}`

Makes a player to withdraw - the player is removed from the current game.
