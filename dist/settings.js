var settings = {
    "symbolSize": 140,
    "spaceBetweenReels": 20,

    "numOfRows": 3,
    "numOfReels": 5,

    "numOfSpinsBeforeStop": 3,

    "delayBetweenShowingWinningLines": 700,
    "delayBetweenReelsSpin": 200,
    "delayBetweenFallingSymbols": 300,
    "delayBeforeStartFallingReel": 0,
    "spinAnimationTimeInMs": 1000,
    "spinAnimTimingFunc": "ease-in-out",
    "fallAnimTimingFunc": "cubic-bezier(.79,1.51,.74,.84)",

    "symbolsImagesPath": "./assets/images/bananasSymbols/",
    "symbolsAnimationsPath": "./assets/images/bananasSymbols/animations/",

    "symbols": [
        {"image": "1.png"},
        {"image": "2.png"},
        {"image": "3.png"},
        {"image": "4.png", "animation": "4Anim.png"},
        {"image": "5.png"},
        {"image": "6.png"},
        {"image": "7.png"},
        {"image": "8.png"},
        {"image": "9.png"},
        {"image": "10.png"}
    ],

    "denominations": [1, 10, 25, 50, 100],

    "lines": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    "betPerLine": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 40, 50, 60, 70, 80, 90, 100],

    "lineTypes": [
        [ [1, 0], [1, 1], [1, 2], [1, 3], [1, 4] ],
        [ [0, 0], [0, 1], [0, 2], [0, 3], [0, 4] ],
        [ [2, 0], [2, 1], [2, 2], [2, 3], [2, 4] ],
        [ [0, 0], [1, 1], [2, 2], [1, 3], [0, 4] ],
        [ [2, 0], [1, 1], [0, 2], [1, 3], [2, 4] ],
        [ [1, 0], [0, 1], [0, 2], [0, 3], [1, 4] ],
        [ [1, 0], [2, 1], [2, 2], [2, 3], [1, 4] ],
        [ [0, 0], [0, 1], [1, 2], [2, 3], [2, 4] ],
        [ [2, 0], [2, 1], [1, 2], [0, 3], [0, 4] ],
        [ [1, 0], [0, 1], [1, 2], [2, 3], [2, 4] ],

        [ [1, 0], [2, 1], [1, 2], [2, 3], [1, 4] ],
        [ [1, 0], [0, 1], [1, 2], [0, 3], [1, 4] ],
        [ [0, 0], [1, 1], [0, 2], [1, 3], [0, 4] ],
        [ [2, 0], [1, 1], [2, 2], [1, 3], [2, 4] ],
        [ [1, 0], [1, 1], [0, 2], [1, 3], [1, 4] ],
        [ [1, 0], [1, 1], [2, 2], [1, 3], [1, 4] ],
        [ [0, 0], [0, 1], [1, 2], [0, 3], [0, 4] ],
        [ [2, 0], [2, 1], [1, 2], [2, 3], [2, 4] ],
        [ [0, 0], [1, 1], [1, 2], [1, 3], [0, 4] ],
        [ [2, 0], [1, 1], [1, 2], [1, 3], [2, 4] ]
    ],
    "linePresenterLeftLines": [3, 1, 7, 5, 9, 0, 6, 8, 2, 4],
    "linePresenterRightLines": [16, 12, 18, 14, 11, 10, 15, 19, 13, 17]
}
