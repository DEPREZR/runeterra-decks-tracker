import { getCurrentDeck, getGameResult } from "../../gameApiHelpers";
import { useState, useEffect } from "react";
import { getData, writeData } from "../../fileSystemHelpers";

// previousResult: { lastDeck, lastGameId, results };
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
      lastDeck: { DeckCode: null, CardsInDeck: null },
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
    lastDeck: { DeckCode: null, CardsInDeck: null },
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

const getRemoveGameResult = setResult => deckCode => {
  setResult(previousResult => ({
    ...previousResult,
    results: previousResult.results.filter(deck => deck.deckCode !== deckCode)
  }));
};

const useGetGamesResults = () => {
  const [result, setResult] = useState({
    lastGameId: -1,
    lastDeck: { DeckCode: null, CardsInDeck: null },
    results: getData() || []
  });

  const callback = async () => {
    let timeoutId;
    const controllerCurrentDeck = new AbortController();
    const signalCurrentDeck = controllerCurrentDeck.signal;
    const controllerGameResult = new AbortController();
    const signalGameResult = controllerCurrentDeck.signal;
    const promiseAbort = new Promise(resolve => {
      timeoutId = setTimeout(() => {
        try {
          controllerCurrentDeck.abort();
        } catch (err) {
          console.log(err);
        }
        try {
          controllerGameResult.abort();
        } catch (err) {
          console.log(err);
        }

        resolve();
      }, 20000);
    });
    const promisesApi = Promise.all([
      getCurrentDeck(signalCurrentDeck),
      getGameResult(signalGameResult)
    ]);

    await Promise.race([promisesApi, promiseAbort]);

    if (timeoutId) clearTimeout(timeoutId);

    const [responseDeck, responseGameResult] = await promisesApi;
    let dataGameResult = { GameID: -1, LocalPlayerWon: false };
    let dataDeck = { DeckCode: null, CardsInDeck: null };
    if (!responseGameResult.hasError) {
      try {
        dataGameResult = await responseGameResult.json();
      } catch (err) {
        console.log(err);
      }
    }
    if (!responseDeck.hasError) {
      try {
        dataDeck = await responseDeck.json();
      } catch (err) {
        console.log(err);
      }
    }

    await setResult(previousResult => {
      if (responseGameResult.hasError || responseDeck.hasError) {
        return {
          ...previousResult,
          lastDeck: dataDeck,
          lastGameId: -1
        };
      }
      if (
        dataGameResult.GameID !== previousResult.lastGameId &&
        dataGameResult.GameID !== -1 &&
        previousResult.lastDeck.DeckCode
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

  writeData(result.results);

  return {
    gameResults: result.results,
    removeGameResult: getRemoveGameResult(setResult)
  };
};

export default useGetGamesResults;
