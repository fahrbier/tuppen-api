party = [
    {
    "id": "934af5ee-f7dc-4a9b-b198-069710018fa5",
    "namePlayer": "John Doe 1",
    "cardPlayed": {},
    "hasAnCard": true,
    "hand": [
    {
    "id": "8edccbcd-5d20-45ab-80fe-5a380c5a0387",
    "suit": "clubs",
    "rank": "9",
    "myRank": 7,
    "open": false
    },
    {
    "id": "19d1b2e8-75bb-4488-87fd-4f5670652613",
    "suit": "spades",
    "rank": "9",
    "myRank": 7,
    "open": true
    },
    {
    "id": "9862fb83-864c-457b-90bf-4de7f881b68c",
    "suit": "diams",
    "rank": "7",
    "myRank": 5,
    "open": false
    },
    {
    "id": "ddb96053-b7e1-4468-832c-a96aba89efa1",
    "suit": "spades",
    "rank": "8",
    "myRank": 6,
    "open": false
    }
    ]
    },
    {
    "id": "0358d14d-1e53-409c-a646-c82c9d3cac20",
    "namePlayer": "John Doe 2",
    "cardPlayed": {},
    "hasAnCard": false,
    "hand": [
    {
    "id": "0ab3fd5a-a844-4735-8785-31bf5bf01f5d",
    "suit": "hearts",
    "rank": "k",
    "myRank": 3,
    "open": false
    },
    {
    "id": "0123b79c-15a3-41f1-85ac-f423726cb912",
    "suit": "hearts",
    "rank": "8",
    "myRank": 6,
    "open": false
    },
    {
    "id": "1557cd38-2f81-4e43-837b-06e4b29bf8e4",
    "suit": "clubs",
    "rank": "10",
    "myRank": 8,
    "open": false
    },
    {
    "id": "2329ee43-fe2b-4722-9ac8-159143e7119d",
    "suit": "spades",
    "rank": "7",
    "myRank": 5,
    "open": true
    }
    ]
    }
    ]



    currentPlayer = party.findIndex(function(player){
        console.log(player);
        return player.hasAnCard == true;
    });

    console.log(currentPlayer);