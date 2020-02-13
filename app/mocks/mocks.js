const deckMock = {
  "01SI027": 2,
  "01SI047": 2,
  "01PZ036": 2,
  "01PZ039": 2,
  "01PZ009": 1,
  "01PZ012": 1,
  "01PZ016": 1,
  "01PZ020": 1,
  "01PZ026": 1,
  "01PZ027": 1,
  "01PZ038": 1,
  "01PZ042": 1,
  "01PZ043": 1,
  "01PZ046": 1,
  "01PZ047": 1,
  "01PZ052": 1,
  "01PZ054": 1,
  "01PZ055": 1,
  "01PZ057": 1,
  "01PZ059": 1,
  "01SI004": 1,
  "01SI007": 1,
  "01SI009": 1,
  "01SI010": 1,
  "01SI011": 1,
  "01SI014": 1,
  "01SI021": 1,
  "01SI023": 1,
  "01SI036": 1,
  "01SI039": 1,
  "01SI040": 1,
  "01SI045": 1,
  "01SI046": 1,
  "01SI049": 1,
  "01SI053": 1,
  "01SI056": 1
};

const gameResultMock = {
  cardsInDeck: deckMock,
  deckCode:
    "CEAAEAQBAUNS6AQBAQSCOAQQAECASDAQCQNBWJRKFMXC6NBWG44TWEABAUCAOCIKBMHBKFZEE4UC2LRRGU4A",
  winAmount: 3,
  defeatAmount: 4
};

export const gameResultsMock = [
  { ...gameResultMock },
  {
    ...gameResultMock,
    cardsInDeck: {
      "01SI004": 3,
      "01SI021": 3,
      "01IO003": 3,
      "01IO026": 3,
      "01IO049": 3,
      "01IO009": 2,
      "01IO044": 2,
      "01IO057": 2,
      "01SI022": 2,
      "01SI023": 2,
      "01SI034": 2,
      "01SI035": 2,
      "01SI042": 2,
      "01SI043": 2,
      "01SI048": 2,
      "01SI049": 2,
      "01SI009": 1,
      "01SI033": 1,
      "01SI040": 1
    },
    winAmount: 1250,
    defeatAmount: 1125
  },
  { ...gameResultMock },
  { ...gameResultMock },
  { ...gameResultMock },
  { ...gameResultMock },
  { ...gameResultMock }
];
