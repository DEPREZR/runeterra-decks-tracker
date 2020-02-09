import { getCurrentDeck, getGameResult } from "../../gameApiHelpers";
import { useState, useEffect } from "react";

// previousResult: { lastDeck, results };
// dataGameResult: { LocalPlayerWon }
// result (elem in results): { cardsInDeck, deckCode, winAmount, defeatAmount }
const addNewGameToResult = ({ previousResult, dataGameResult }) => {
  const {
    lastDeck: { DeckCode, CardsInDeck }
  } = previousResult;

  const resultOfDeckIndex = previousResult.results.findIndex(
    result => result.deckCode === DeckCode
  );

  if (resultOfDeckIndex === -1)
    return {
      ...previousResult,
      lastGameId: dataGameResult.GameID,
      results: [
        ...previousResult.results,
        {
          cardsInDeck: CardsInDeck,
          deckCode: DeckCode,
          winAmount: dataGameResult.LocalPlayerWon ? 1 : 0,
          defeatAmount: dataGameResult.LocalPlayerWon ? 0 : 1
        }
      ]
    };
  const { results } = previousResult;
  const [resultOfDeck] = results.splice(resultOfDeckIndex, 1);

  return {
    ...previousResult,
    lastGameId: dataGameResult.GameID,
    results: [
      ...results,
      {
        ...resultOfDeck,
        winAmount: dataGameResult.LocalPlayerWon
          ? resultOfDeck.winAmount + 1
          : resultOfDeck.winAmount,
        defeatAmount: dataGameResult.LocalPlayerWon
          ? resultOfDeck.defeatAmount
          : resultOfDeck.defeatAmount + 1
      }
    ]
  };
};

const useGetGamesResults = () => {
  const [result, setResult] = useState({
    lastGameId: -1,
    lastDeck: null,
    results: []
  });

  const callback = async () => {
    const [responseDeck, responseGameResult] = await Promise.all([
      getCurrentDeck(),
      getGameResult()
    ]);

    let dataGameResult = { GameID: -1, LocalPlayerWon: false };
    let dataDeck = { DeckCode: null, CardsInDeck: null };
    if (!responseGameResult.hasError) {
      dataGameResult = await responseGameResult.json();
    }
    if (!responseDeck.hasError) {
      dataDeck = await responseDeck.json();
    }

    await setResult(previousResult => {
      if (
        dataGameResult.GameID !== previousResult.lastGameId &&
        dataGameResult.GameID !== -1
      ) {
        return addNewGameToResult({ previousResult, dataGameResult });
      } else {
        if (dataDeck.DeckCode !== null) {
          return {
            ...previousResult,
            lastDeck: dataDeck
          };
        }
        return { ...previousResult };
      }
    });

    await new Promise(resolve => setTimeout(resolve, 2000));

    callback();
  };

  useEffect(
    () => {
      callback();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return result.results;
};

export default useGetGamesResults;
