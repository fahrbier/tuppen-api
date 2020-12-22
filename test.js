liste = [
    {
        'id': 1,
        'ak': false,
        'c': {'id':'abc', 'rank':1}
    },
    {
        'id': 2,
        'ak': false,
        'c': {'id':'bcd', 'rank':3}
    },
    {
        'id': 3,
        'ak': false,
        'c': {'id':'cde', 'rank':2}
    }    
]



liste = liste.map(function(player, index) {
    if (player.id == 3) {
        player.ak = true;
    }
    return player;
  })

  console.log(liste);